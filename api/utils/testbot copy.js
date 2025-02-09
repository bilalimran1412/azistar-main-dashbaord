const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const readline = require('readline');
require('dotenv').config();
const { NlpManager } = require('node-nlp');
const { HfInference } = require('@huggingface/inference');
const manager = new NlpManager({ languages: ['en'] });
const hf = new HfInference('');



// distilgpt2, microsoft/DialoGPT-medium, OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5, and gpt2


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
            "Hey there! How can I help today?",
            "Hello, great to have you here. What can I do for you?",
            "Hi there, how’s your day going?",
            "Greetings! Feel free to tell me what’s on your mind.",
            "Yo! I’m all ears if you need something."
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
            "Take care and have a wonderful day!",
            "See you next time, stay safe!",
            "Goodbye! Hope to chat again soon.",
            "Catch you later! I’ll be right here if you come back.",
            "Adios! Keep smiling until next time."
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
            "You’re welcome! Anything else I can help with?",
            "My pleasure! Let me know if there’s more I can do.",
            "No problem at all. What else would you like to know?",
            "Happy to help! Need anything else?",
            "You got it! Feel free to ask more questions."
        ]
    }
];

async function loadIntents() {
    const intentsFile = path.join(__dirname, '../../intents.json');
    try {
        const content = fs.readFileSync(intentsFile, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error loading intents file:', error);
        return [];
    }
}

function loadScrapedData() {
    const scrapedDataPath = path.join(__dirname, '../../scraped_data');
    if (!fs.existsSync(scrapedDataPath)) return {};
    const files = fs.readdirSync(scrapedDataPath);
    return files.reduce((data, file) => {
        const filePath = path.join(scrapedDataPath, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data[file] = content.data;
        return data;
    }, {});
}

const scrapedData = loadScrapedData();
let intents = [];
async function getHuggingFaceResponse(userMessage, intentResponse, attempt = 1) {
    const prompt = `
You are a friendly and helpful assistant. Your task is twofold:
1. Rewrite the assistant’s original response suggestion to make it more engaging, conversational, and human-like.
2. Follow up with a follow up question that expand on the original answer you gave asking them if they want to know more specifically. 
Ensure both the rewritten response and the follow-up question are clearly separated.

User: ${userMessage}

Assistant's original response suggestion: ${intentResponse}

Rewritten response:
`;

    const url = 'https://api-inference.huggingface.co/models/google/flan-t5-large';
    const headers = {
        Authorization: `Bearer`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(
            url,
            {
                inputs: prompt,
                parameters: {
                    max_new_tokens: 250, // Set max tokens to 250
                    temperature: 0.7,
                    top_p: 0.95,
                },
            },
            { headers }
        );

        // Handle the response correctly when it's an array
        if (Array.isArray(response.data)) {
            const generatedText = response.data[0]?.generated_text || "Error in generating response.";
            const parts = generatedText.trim().split('\n');
            const rewrittenResponse = parts[0]?.trim() || "Error in generating response.";
            const followUpQuestion = parts[1]?.trim() || "Error in generating follow-up question.";
            return `${rewrittenResponse}\n\n${followUpQuestion}`;
        }

        console.error('Unexpected response format:', response.data);
        return "I'm having trouble generating a conversational response right now.";
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.includes('currently loading') &&
            attempt <= 5
        ) {
            const waitTime = Math.pow(2, attempt) * 1000;
            console.log(`Model is loading, retrying in ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return await getHuggingFaceResponse(userMessage, intentResponse, attempt + 1);
        } else {
            console.error('Error with Hugging Face API:', error.response?.data || error.message);
            return "I'm having trouble processing that right now.";
        }
    }
}


async function getChatbotResponse(userMessage) {
    const response = await manager.process('en', userMessage);
    if (response.intent && response.answer) {
        const enhancedResponse = await getHuggingFaceResponse(userMessage, response.answer);
        return enhancedResponse;
    } else {
        return "I’m not entirely sure what you mean. Could you tell me more about that, or maybe rephrase your question?";
    }
}

async function saveIntents(intents) {
    const fileName = path.join(__dirname, '../../intents.json');
    let existingIntents = [];

    try {
        const intentsContent = fs.readFileSync(fileName, 'utf8');
        existingIntents = JSON.parse(intentsContent);
    } catch (error) {
        console.error('Error loading existing intents, starting fresh:', error);
    }

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
    intents = await loadIntents();
    console.log("Loaded Intents: ", intents);

    intents.forEach(intent => {
        if (intent.patterns && Array.isArray(intent.patterns) && intent.responses && typeof intent.responses === 'object') {
            intent.patterns.forEach(pattern => {
                manager.addDocument('en', pattern.toLowerCase(), intent.tag.toLowerCase());
            });

            const allResponses = [
                ...(intent.responses.formal || []),
                ...(intent.responses.informal || []),
                ...(intent.responses.neutral || [])
            ];

            allResponses.forEach(response => {
                manager.addAnswer('en', intent.tag.toLowerCase(), response);
            });
        } else {
            console.warn(`Invalid intent format: ${JSON.stringify(intent)}`);
        }
    });

    console.log('Training NLP manager...');
    await manager.train();
    console.log('NLP manager trained successfully.');
}

(async () => {
    await initializeNlpManager();
    console.log('Chatbot initialized successfully.');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log("Type 'stop' to end the chat.");

    while (true) {
        await new Promise(resolve => {
            rl.question('You: ', async (userMessage) => {
                if (userMessage.trim().toLowerCase() === 'stop') {
                    console.log('Chatbot: Goodbye!');
                    rl.close();
                    resolve();
                    process.exit(0);
                } else {
                    const response = await getChatbotResponse(userMessage);
                    console.log(`Chatbot: ${response}`);
                    resolve();
                }
            });
        });
    }
})();
