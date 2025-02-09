const mongoose = require('mongoose');

const scrapDataFileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    scrap_data: { type: Object, default: 'processing'},
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
});

const ScrapDataFile = mongoose.model('scrapDataFileSchema', scrapDataFileSchema);

module.exports = ScrapDataFile;
