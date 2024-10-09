const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    websiteId: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('LiveMessage', messageSchema);
