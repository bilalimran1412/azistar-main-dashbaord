const LiveMessage = require('../model/LiveMessage');
const { getChatbotResponse, GLOBALS } = require('../utils/scrapDataUtils');
const path = require('path');
const fs = require('fs');

exports.handleChat = async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log('Received user message:', userMessage);
        
        const { userId } = req.body;
        let websiteId = req.body.websiteId || 0;

        // Save user message to the database
        await LiveMessage.create({ websiteId, text: userMessage, sender: 'user', user_id: userId });
        
        // if (userMessage.toLowerCase().includes('live chat') || userMessage.toLowerCase().includes('agent') || userMessage.toLowerCase().includes('person') || userMessage.toLowerCase().includes('livechat')) {
        //     const whatsappUrl = 'https://wa.me/971506683114';
        //     return res.status(200).json({ response: 'Redirecting to WhatsApp...', whatsappUrl, initiateLiveChat: true });
        // }

        // const chatbotResponse = await getChatbotResponse(userMessage);
        // console.log('Chatbot response:', chatbotResponse);
        // const response = chatbotResponse || 'I\'m sorry, I didn\'t understand that.';

        // // Save bot response to the database
        // await LiveMessage.create({ websiteId, text: response, sender: 'bot', user_id: userId });

        // const customResponse = {
        //     response,
        //     score: GLOBALS.score,
        //     appName: GLOBALS.appName,
        // };

        // console.log("Custom response:", customResponse);
        // return res.status(200).json(customResponse);
    } catch (error) {
        console.error('Error handling chat:', error);
        return res.status(500).json({ message: 'Please try again.' });
    }
};



// Live Chat


exports.livechat = async (req, res) => {
    const userMessage = req.body.message;
    console.log('Received user message:', userMessage);

    if (userMessage.toLowerCase().includes('live chat') || userMessage.toLowerCase().includes('agent') || userMessage.toLowerCase().includes('person')  ||userMessage.toLowerCase().includes('livechat') ) {
        // Replace <phone_number> with the actual phone number including country code, but without any '+' or '-'
        const whatsappUrl = 'https://wa.me/971506683114';
        return res.status(200).json({ response: 'Redirecting to WhatsApp...', whatsappUrl: whatsappUrl,initiateLiveChat: true });
    }

    const chatbotResponse = await getChatbotResponse(userMessage);
    console.log('Chatbot response:', chatbotResponse);

    const customResponse = {
        response: chatbotResponse,
        score: GLOBALS.score,
        appName: GLOBALS.appName,
    };
    console.log("custom response", customResponse);
    return res.status(200).json(customResponse);
};






exports.intents = (req, res) => {
    const intentsPath = path.join(__dirname, '../../intents.json');
    
    fs.readFile(intentsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading intents file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(JSON.parse(data));
    });
};