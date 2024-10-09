// models/agentModel.js
const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, required: true },
    role: { type: String, default: 'Agent' },
    department: { type: String, required: true },
}, { timestamps: true });

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;