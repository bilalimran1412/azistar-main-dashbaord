const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
const { NlpManager } = require('node-nlp'); 
const manager = new NlpManager({ languages: ['en'] });


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


// const SCRAP_DATA = false;

// async function saveIntents(intents) {
//     const fileName = path.join(__dirname, '../../intents.json');
//     try {
//         // Ensure responses are arrays
//         if (!Array.isArray(intents)) {
//             throw new Error('Intents should be an array');
//         }

//         intents.forEach(intent => {
//             if (!intent.responses || !Array.isArray(intent.responses)) {
//                 intent.responses = []; 
//             }
//         });
//         await fs.promises.writeFile(fileName, JSON.stringify(intents, null, 2));
//         console.log(`Intents saved to file: ${fileName}`);
//     } catch (err) {
//         console.error('Error saving intents:', err);
//     }
// }

async function saveIntents(intents) {
    const fileName = path.join(__dirname, '../../intents.json');
    let existingIntents = [];

    try {
        const intentsContent = fs.readFileSync(fileName, 'utf8');
        existingIntents = JSON.parse(intentsContent);
    } catch (error) {
        console.error('Error loading existing intents, starting fresh:', error);
    }

    // Merge existing intents with new ones
    const mergedIntents = [...existingIntents, ...intents];


    fs.writeFile(fileName, JSON.stringify(mergedIntents, null, 2), (err) => {
        if (err) {
            console.error('Error saving intents:', err);
        } else {
            console.log(`Intents saved to file: ${fileName}`);
        }
    });
}


async function initializeNlpManager() {
    const intentsFile = path.join(__dirname, '../../intents.json');

    let intents;
    try {
        const intentsContent = fs.readFileSync(intentsFile, 'utf8');
        intents = JSON.parse(intentsContent);
    } catch (error) {
        console.error('Error loading intents file:', error);
        return; // Exit if there's an error
    }

    intents.forEach(intent => {
        if (intent && intent.patterns && Array.isArray(intent.patterns) && intent.responses && Array.isArray(intent.responses)) {
            intent.patterns.forEach(pattern => {
                if (pattern) {
                    manager.addDocument('en', pattern, intent.tag);
                } else {
                    console.warn(`Pattern is null for tag: ${intent.tag}`);
                }
            });
            intent.responses.forEach(response => {
                if (response) {
                    manager.addAnswer('en', intent.tag, response);
                }
            });
        } else {
            // console.error('Invalid intent format found in intents.json:', intent);
        }
    });

    console.log('Training NLP manager...');
    await manager.train();
    console.log('NLP manager trained successfully.');

    // Optionally save the model
    try {
        await manager.save();
        console.log('Model saved successfully.');
    } catch (error) {
        console.error('Error saving the model:', error);
    }
}




(async () => {
    await initNlp();
    // await GLOBALS();
})();
// Function to initialize NLP manager
async function initNlp() {
    try {
        await initializeNlpManager();
        console.log('NLP Manager initialized successfully.');
    } catch (error) {
        console.error('Error initializing NLP Manager:', error);
    }
}

// Call the initialization function
// initNlp();

const GLOBALS = {
    appName:"swanchatbot",
    score:0
};


async function getChatbotResponse(message) {
    const response = await manager.process('en', message);
    console.log('NLP Response:', response);

    if (response.intent && response.answer) {
        return response.answer;
    } else {
        console.log("I am unable to understand. Should I start a live chat? Kindly enter 'live chat' to start it.");
        return "I'm sorry, I didn't understand that. Would you like to start a live chat?";
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
            apiKey: 'apiKey',
        });
        
        // Structure the prompt to request JSON format with multiple responses per tone
        let prompt = `
            Based on the following data, generate detailed and structured intents for a chatbot in JSON format with the following structure:
            - "tag": a unique identifier for the intent
            - "patterns": a list of questions or phrases the user might ask
            - "responses": an object with three keys ("formal", "informal", "neutral"), each containing multiple unique responses

            Ensure the JSON format is strictly followed as shown below:

            {
              "tag": "<intent_tag>",
              "patterns": ["<pattern1>", "<pattern2>", "..."],
              "responses": {
                "formal": ["<response1>", "<response2>", "..."],
                "informal": ["<response1>", "<response2>", "..."],
                "neutral": ["<response1>", "<response2>", "..."]
              }
            }

            Input data:\n\n${data}
        `;

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
        });

        // Clean and parse the response to ensure valid JSON format
        const responseText = chatCompletion.choices[0].message.content;
        const parsedResponse = JSON.parse(responseText);
        console.log("Parsed Intents:", parsedResponse.intents);

        return parsedResponse.intents;

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
            apiKey: 'apiKey',
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




module.exports = { GLOBALS, initializeNlpManager, getWebData, saveIntents, sanitizeText, saveScrapedData, genrateautoIntents, generateIntents, getChatbotResponse };