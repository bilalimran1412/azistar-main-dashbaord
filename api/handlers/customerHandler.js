// controllers/customerController.js
const Customer = require('../model/customerModel');
const nodemailer = require('nodemailer');

// Create a new customer

const createCustomer = async (req, res) => {
    const { email, phone, userId, websiteId } = req.body;
    const newuserId = userId;
    try { 
        // Check if the customer already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ success: false, message: 'Email already exists', customer: existingCustomer });
        }

        // Create new customer
        const newCustomer = new Customer({ email, phone, userId, websiteId, newuserId });
        await newCustomer.save();
        return res.status(201).json({ success: true, customer: newCustomer });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating customer', error });
    }
};



// Update customer status
const updateCustomerStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({ success: true, customer: updatedCustomer });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating customer status', error });
  }
};

// Retrieve customer data
const getCustomerData = async (req, res) => {
  const { newuserId } = req.params;
  try {
    const customers = await Customer.find({ newuserId }).sort({ timestamp: 1 });
    return res.status(200).json({ success: true, customers });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving customers', error });
  }
};


const getEmailData = async (req, res) => {
    const { email } = req.params;

    console.log("Fetching customer with email:", email); // Debug log
    try {
        const customers = await Customer.find({ email }).sort({ timestamp: 1 });

        console.log("Query results:", customers); // Log the results from the database

        if (customers.length === 0) {
            return res.status(404).json({ success: false, message: 'No customers found with that email.' });
        }

        return res.status(200).json({ success: true, customers });
    } catch (error) {
        console.error('Error retrieving:', error);
        return res.status(500).json({ success: false, message: 'Error retrieving customers', error: error.message });
    }
};


  

const getCustomerChatData = async (req, res) => {
    const { id, newuserId } = req.params;
  
    try {
        const customers = await Customer.find({ newuserId, _id: id }).sort({ timestamp: 1 });
        return res.status(200).json({ success: true, customers });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error retrieving customers', error });
    }
  };

  

  
// Delete a customer by ID
const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({ success: true, message: 'Customer deleted successfully', customer: deletedCustomer });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting customer', error });
  }
};


// Send transcript function
const sendTranscript = async (req, res) => {
    const { email, transcript } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'm0432820@gmail.com',  
            pass: '3730@@success',     
        },
    });

    const mailOptions = {
        from: 'no-reply@yourdomain.com', 
        to: email,
        subject: 'Chat Transcript',
        text: transcript,
        html: `<pre>${transcript}</pre>`, 
    };
    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Transcript sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send transcript', error });
    }
};

const updateUserId = async (req, res) => {
  const { _id } = req.params;
  const { newuserId } = req.body; 

  if (!newuserId) {
      return res.status(400).json({ success: false, message: 'New userId is required' });
  }

  try {
      const updatedCustomer = await Customer.findByIdAndUpdate(
          _id,
          { newuserId }, 
          { new: true, runValidators: true }
      );
      if (!updatedCustomer) {
          return res.status(404).json({ success: false, message: 'Customer not found' });
      }

      return res.status(200).json({ success: true, customer: updatedCustomer });
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Error updating newuserId', error });
  }
};




module.exports = {
  createCustomer,
  updateCustomerStatus,
  getCustomerData,
  getCustomerChatData,
  getEmailData,
  deleteCustomer,
  sendTranscript,
  updateUserId
};
