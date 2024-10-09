// controllers/dbUtils.js

const ScrapDataSite = require('../model/ScrapDataSite'); // Import the model

async function getLastUrlFromDatabase() {
    try {
        const lastUrl = await ScrapDataSite.findOne().sort({ _id: -1 }).select('url');
        return lastUrl ? lastUrl.url : null; // Return the URL or null if none found
    } catch (error) {
        console.error('Error querying last URL from database:', error);
        return null; 
    }
}

module.exports = { getLastUrlFromDatabase }; // Export the function
