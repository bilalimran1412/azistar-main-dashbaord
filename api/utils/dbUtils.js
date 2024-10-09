const ScrapDataSite = require('../model/ScrapDataSite');

const { NlpManager } = require('node-nlp'); 
const manager = new NlpManager({ languages: ['en'] });
const {initializeNlpManager} = require('./scrapDataUtils')


exports.getChatbotResponse = async (message) => {
    const response = await manager.process('en', message);

    console.log('NLP Response:', response);
    const { score, answer, intent } = response;
    if (score > 0.3 && intent !== 'None') {
        console.log('Confidence Score:', score);
        return answer || "Sorry, I didn't understand that.";
    } else {
        console.log("I am unable to understand. Should I start live chat?");
        return null; // or return a default response
    }
};


(async () => {
    await initNlp();
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
initNlp(); 

exports.GLOBALS = {
    appName:"swanchatbot",
    score:0
};



// Get all data for a specific user
exports.getDataByUserId = async (userId) => {
    return await ScrapDataSite.find({ user_id: userId });
};

// Get URL ID by URL
exports.getUrlIdByUrl = async (url) => {
    const data = await ScrapDataSite.findOne({ url });
    return data ? data._id : null;
};

// Save a new ScrapDataSite entry
exports.saveScrapData = async (url, userId) => {
    const newEntry = new ScrapDataSite({ url, user_id: userId });
    return await newEntry.save();
};

// Update scraping status
exports.updateScrapingStatus = async (id, status) => {
    return await ScrapDataSite.findByIdAndUpdate(id, { status }, { new: true });
};

// Delete a ScrapDataSite entry by ID
exports.deleteScrapDataById = async (id) => {
    return await ScrapDataSite.findByIdAndDelete(id);
};




