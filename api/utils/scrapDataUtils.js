const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { NlpManager } = require('node-nlp');
require('dotenv').config();


exports.customdata = [
    {
        "tag": "greeting",
        "patterns": [
            "Hi",
            "Hey",
            "How are you",
            "Is anyone there?",
            "Hello",
            "Good day",
            "Hi there",
            "Greetings",
            "Yo",
            "Hiya"
        ],
        "responses": [
            "Hey :-)",
            "Hello, thanks for visiting",
            "Hi there, what can I do for you?",
            "Hi there, how can I help?",
            "Greetings! How may I assist you?",
            "Yo! What's up?"
        ]
    },
    {
        "tag": "goodbye",
        "patterns": [
            "Bye",
            "See you later",
            "Goodbye",
            "Catch you later",
            "Take care",
            "Adios",
            "So long"
        ],
        "responses": [
            "See you later, thanks for visiting",
            "Have a nice day",
            "Bye! Come back again soon.",
            "Take care!",
            "Goodbye! Have a great day.",
            "Adios! Until next time."
        ]
    },
    {
        "tag": "thanks",
        "patterns": [
            "Thanks",
            "Thank you",
            "That's helpful",
            "Thank's a lot!",
            "Appreciate it",
            "Thanks a bunch",
            "Cheers"
        ],
        "responses": [
            "Happy to help!",
            "Any time!",
            "My pleasure",
            "You're welcome!",
            "Glad I could assist!",
            "Cheers!"
        ]
    }
]

let manager;

const SCRAP_DATA = false;

async function saveIntents(intents) {
    const fileName = path.join(__dirname, '../../intents.json');
    try {
        // Ensure responses are arrays
        intents.forEach(intent => {
            if (!Array.isArray(intent.responses)) {
                intent.responses = [];
            }
        });
        await fs.promises.writeFile(fileName, JSON.stringify(intents, null, 2));
        console.log(`Intents saved to file: ${fileName}`);
    } catch (err) {
        console.error('Error saving intents:', err);
    }
}


async function initializeNlpManager() {
    manager = new NlpManager({ languages: ['en'] });
    const intentsFile = path.join(__dirname, '../../intents.json');

    if (fs.existsSync(intentsFile)) {
        const intentsContent = fs.readFileSync(intentsFile, 'utf8');

        // console.log("content", intentsContent)
        try {

            const intents = JSON.parse(intentsContent);
            // console.log(intents , 'chl gya hi')
            // intents.forEach(intent => {
            //     if (intent.patterns && intent.responses) {
            //         intent.patterns.forEach(pattern => {
            //             manager.addDocument('en', pattern, intent.tag);
            //         });
            //         intent.responses.forEach(response => {
            //             manager.addAnswer('en', intent.tag, response);
            //         });
            //     } else {
            //         console.error('Missing patterns or responses in intent:', intent);
            //     }
            // });
            intents.forEach(intent => {
                if (intent.patterns && Array.isArray(intent.responses)) {
                    intent.patterns.forEach(pattern => {
                        manager.addDocument('en', pattern, intent.tag);
                        // console.log(`Added pattern: `);
                        
                    });
                    intent.responses.forEach(response => {
                        // console.log(`Added response: ${response} for tag: ${intent.tag}`);
                        manager.addAnswer('en', intent.tag, response);
                    });
                } else {
                    console.error('Missing patterns or responses in intent:', intent);
                }
            });

            console.log("Training Started")
            await manager.train();

            console.log('NLP manager trained successfully.');
            // Optionally save the model
            manager.save();


        } catch (error) {

            console.error('Error parsing intents JSON or training NLP manager:', error);
            console.log("And the intent is")
        }
    } else {
        console.error('Intents file does not exist:', intentsFile);
    }
}




async function getWebData(url) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    };

    try {
        const response = await axios.get(url, { headers });
        const html = response.data;
        const $ = cheerio.load(html);

        $('script, style, img, link').remove();

        const bodyText = $('body').text();
        return bodyText.trim();
    } catch (error) {
        console.error('Error fetching web data:', error);
        return null;
    }
}


require('dotenv').config();

async function generateIntents(data) {
    try {
        const OpenAI = await import('openai');
        const openai = new OpenAI.default({
            apiKey: process.env.OPENAI_API_KEY,
        });

        let prompt = 'Based on the following data, generate extensive detailed and intelligent yet common intents for a chatbot in JSON format: ...';

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
        });

        const responseText = chatCompletion.choices[0].message.content;
        console.log('genrate ho gya');
        return JSON.parse(responseText).intents;

    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return [];
    }
}






function splitIntoChunks(text, maxSize) {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
    let chunks = [];
    let chunk = '';

    for (const sentence of sentences) {
        if ((chunk + sentence).length > maxSize) {
            chunks.push(chunk);
            chunk = sentence;
        } else {
            chunk += sentence;
        }
    }

    if (chunk.length > 0) {
        chunks.push(chunk);
    }

    return chunks;
}



function sanitizeText(text) {
    const regex = /<img[^>]*>|<\s*link[^>]*>|<\s*style[^>]*>.*?<\/style>|<\s*style[^>]*>/gi;
    const textContent = text.replace(regex, '');
    return textContent;
}


async function saveScrapedData(url, data) {
    const fileName = path.join(__dirname, '../../scraped_data', `${url.replace(/https?:\/\//, '').replace(/[\/:]/g, '_')}.json`);
    const content = { url, data };

    fs.writeFile(fileName, JSON.stringify(content, null, 2), (err) => {
        if (err) {
            console.error('Error saving scraped data:', err);
        } else {
            console.log(`Scraped data saved for URL: ${url} to file: ${fileName}`);
        }
    });
}






async function genrateautoIntents(patterns, responses) {
    try {
        const OpenAI = await import('openai');
        const openai = new OpenAI.default({
            apiKey: 'sk-svcacct-iJEIzFLomkRX1AXfzxppT3BlbkFJKQesbAN7C4fuBCupHN4E',
        });
        let prompt = 'Based on the following data, generate extensive detailed and intelligent yet common intents for a chatbot in JSON format: as tag patterns and responses in json format, patterns should be extensive questions which user could ask\n\n' + patterns + responses;
        const chatCompletions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
        });

        const responseText = chatCompletions.choices[0].message.content;
        const intents = JSON.parse(responseText).intents;

        return intents;

    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return [];
    }
}




module.exports = { initializeNlpManager, getWebData, saveIntents, sanitizeText, saveScrapedData, genrateautoIntents, generateIntents };
