const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const readline = require('readline');
require('dotenv').config();
const { NlpManager } = require('node-nlp');
const { HfInference } = require('@huggingface/inference');

// NLP Manager and Hugging Face setup
const manager = new NlpManager({ languages: ['en'], forceNER: true });
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// In-memory context object to manage conversations
const userContext = {};

// Typing indicator function for better UX
async function simulateTyping() {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Load intents from a file
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

// Hugging Face API for conversational tone
async function getHuggingFaceResponse(userMessage, intentResponse, context = {}, attempt = 1) {
    const prompt = `
You are a friendly and helpful assistant. Maintain a conversational tone and build on the user's context. 
If the user asks follow-up questions, connect the new response to the previous conversation.

Context: ${JSON.stringify(context, null, 2)}
User: ${userMessage}

Assistant's original response suggestion: ${intentResponse}

Assistant's response:
`;

    const url = 'https://api-inference.huggingface.co/models/google/flan-t5-large';
    const headers = {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(
            url,
            {
                inputs: prompt,
                parameters: {
                    max_new_tokens: 200,
                    temperature: 0.7,
                    top_p: 0.9,
                },
            },
            { headers }
        );

        if (Array.isArray(response.data)) {
            return response.data[0]?.generated_text || "I'm having trouble processing your request.";
        }

        console.error('Unexpected response format:', response.data);
        return "I couldn't generate a response. Please try again.";
    } catch (error) {
        if (error.response && error.response.data.error.includes('currently loading') && attempt <= 5) {
            console.log('Model loading, retrying...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            return getHuggingFaceResponse(userMessage, intentResponse, context, attempt + 1);
        }
        console.error('Error with Hugging Face API:', error.message);
        return "I'm having trouble responding right now.";
    }
}

// Chatbot response generator
async function getChatbotResponse(userMessage, userId) {
    if (!userContext[userId]) {
        userContext[userId] = { history: [] };
    }

    const context = userContext[userId];
    const response = await manager.process('en', userMessage);

    if (response.intent && response.answer) {
        const hfResponse = await getHuggingFaceResponse(userMessage, response.answer, context);
        context.history.push({ userMessage, chatbotResponse: hfResponse });
        return hfResponse;
    } else {
        return "I'm not entirely sure what you mean. Could you provide more details?";
    }
}

// Save intents for easier customization
async function saveIntents(intents) {
    const fileName = path.join(__dirname, '../../intents.json');
    try {
        const content = JSON.stringify(intents, null, 2);
        fs.writeFileSync(fileName, content, 'utf8');
        console.log('Intents saved successfully.');
    } catch (error) {
        console.error('Error saving intents:', error);
    }
}

// Initialize NLP Manager with intents
async function initializeNlpManager() {
    const intents = await loadIntents();

    intents.forEach(intent => {
        if (intent.patterns && intent.responses) {
            intent.patterns.forEach(pattern => {
                manager.addDocument('en', pattern, intent.tag);
            });

            intent.responses.forEach(response => {
                manager.addAnswer('en', intent.tag, response);
            });
        }
    });

    console.log('Training NLP manager...');
    await manager.train();
    console.log('NLP manager trained successfully.');
}

// Chatbot simulation
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
            rl.question('You: ', async userMessage => {
                if (userMessage.trim().toLowerCase() === 'stop') {
                    console.log('Chatbot: Goodbye!');
                    rl.close();
                    resolve();
                    process.exit(0);
                } else {
                    const userId = 'default-user'; // Replace with session/user ID if needed
                    await simulateTyping();
                    const response = await getChatbotResponse(userMessage, userId);
                    console.log(`Chatbot: ${response}`);
                    resolve();
                }
            });
        });
    }
})();