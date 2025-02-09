const ScrapDataSite = require('../model/ScrapDataSite');

const { NlpManager } = require('node-nlp'); 
const manager = new NlpManager({ languages: ['en'] });




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
exports.updateScrapingStatus = async (id, status, scrap_data) => {
    return await ScrapDataSite.findByIdAndUpdate(id, { status, scrap_data }, { new: true });
};

// Delete a ScrapDataSite entry by ID
exports.deleteScrapDataById = async (id) => {
    return await ScrapDataSite.findByIdAndDelete(id);
};




