// handlers/messageHandler.js
const Message = require('../model/messageModel');

// Save a new message to the database
const saveMessage = async (req, res) => {
  try {
    const { message, sender, userId, websiteId, customerId } = req.body;

    const newMessage = new Message({
      message,
      sender,
      userId,
      websiteId,
      customerId
    });

    await newMessage.save();
    return res.status(200).json({ success: true, message: message });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error saving message', error });
  }
};

const getMessages = async (req, res) => {
  const { userId, customerId } = req.params;
  try {
    const messages = await Message.find({ userId, customerId }).sort({ timestamp: 1 });
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    return res.status(200).json({ 
      success: true, 
      messages, 
      lastMessage 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Error retrieving messages', 
      error 
    });
  }
};



// Retrieve messages for a specific user and website
const getMessagesCustomer = async (req, res) => {
  const { userId, customerId} = req.params;

  try {
    const messages = await Message.find({ userId, customerId }).sort({ timestamp: 1 });
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving messages', error });
  }
};


// get Customer Info

const getCustomerInfo = async (req, res) => {
  const { customerId } = req.params;

  try {
    const info = await Message.find({ customerId }).sort({ timestamp: 1 });
    return res.status(200).json({ success: true, info });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving info', error });
  }
};


// Update the status of a message
const updateMessageStatus = async (req, res) => {
  const { customerId } = req.params; 
  const { status } = req.body; 

  // Validate status
  if (typeof status !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
      const updatedMessage = await Message.findOneAndUpdate(
          { customerId: customerId }, 
          { status }, 
          { new: true, runValidators: true }
      );

      if (!updatedMessage) {
          return res.status(404).json({ success: false, message: 'Message not found' });
      }

      return res.status(200).json({ success: true, message: updatedMessage });
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Error updating message status', error });
  }
};

module.exports = {
  saveMessage,
  getMessages,
  getMessagesCustomer,
  getCustomerInfo,
  updateMessageStatus,
};
