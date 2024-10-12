// routes/messageRoutes.js
const express = require('express');
const { createCustomer, updateCustomerStatus, getCustomerData, getCustomerChatData, getEmailData, deleteCustomer, sendTranscript, updateUserId, getNewCustomerData} = require('../handlers/customerHandler');

const router = express.Router();

// Route to save a message
router.post('', createCustomer);

// Route to retrieve messages by userId and websiteId
router.patch('/:id', updateCustomerStatus);
router.patch('/updateuser/:_id', updateUserId);
router.get('/:newuserId', getCustomerData);
router.get('/customer/:id', getNewCustomerData);
router.get('/:newuserId/:id', getCustomerChatData);
router.get('/:email', getEmailData);
router.delete('/:id', deleteCustomer);
router.post('/send-transcript', sendTranscript);


module.exports = router;