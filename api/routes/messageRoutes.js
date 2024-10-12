// routes/messageRoutes.js
const express = require('express');
const { saveMessage, getMessages, getMessagesCustomer, getCustomerInfo, updateMessageStatus } = require('../handlers/messageHander');

const router = express.Router();

// Route to save a message
router.post('/chat', saveMessage);

// Route to retrieve messages by userId and websiteId
router.get('/:userId/:customerId', getMessages);
router.get('/:userId/:websiteId', getMessagesCustomer);
router.get('/info/:customerId', getCustomerInfo);
router.patch('/:customerId', updateMessageStatus);

module.exports = router;