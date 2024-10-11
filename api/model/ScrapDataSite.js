const mongoose = require('mongoose');

const scrapDataSiteSchema = new mongoose.Schema({
    url: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
});

const ScrapDataSite = mongoose.model('ScrapDataSite', scrapDataSiteSchema);

module.exports = ScrapDataSite;
