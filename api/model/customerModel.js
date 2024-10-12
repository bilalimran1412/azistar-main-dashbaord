// models/customerModel.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  userId: { type: String, required: true },
  newuserId: { type: String},
  assignto: { type: String},
  websiteId: { type: String, required: true },
  status: { type: String, required: true, default: 'true' },
  timestamp: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
