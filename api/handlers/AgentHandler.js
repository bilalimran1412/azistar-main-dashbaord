// controllers/agentController.js
const Agent = require('../model/agentModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config(); 

exports.addAgent = async (req, res) => {
    try {
        const { name, email, password, userId, role, department } = req.body;

        // Create a new agent
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAgent = new Agent({ name, email, password:hashedPassword, userId, role, department });
        await newAgent.save();

        // Set up nodemailer transporter
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail', 
        //     auth: {
        //         user: process.env.EMAIL_USER, 
        //         pass: process.env.EMAIL_PASS  
        //     }
        // });

        // // Email options
        // const mailOptions = {
        //     from: process.env.EMAIL_USER, 
        //     to: email,
        //     subject: 'Your Account Credentials',
        //     text: `Your username is: ${email}\nYour password is: ${password}`
        // };

        // // Send email
        // await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Agent added successfully', agent: newAgent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding agent', error });
    }
};

// Function to get all agents
exports.getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching agents', error });
    }
};


exports.getAgentByUserId = async (req, res) => {
    const { userId } = req.params; 

    try {
        const agent = await Agent.findOne({ userId });

        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.status(200).json(agent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching agent', error });
    }
};




exports.loginAgent = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the agent by email
        const agent = await Agent.findOne({ email });
        
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, agent.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If successful, return a response (consider sending a token in a real app)
        res.status(200).json({ message: 'Login successful', agent: { id: agent._id, name: agent.name, email: agent.email, role: agent.role } });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
