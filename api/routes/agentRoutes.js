// routes/agentRoutes.js
const express = require('express');
const { addAgent, getAllAgents, getAgentByUserId, loginAgent } = require('../handlers/AgentHandler');

const router = express.Router();

router.post('/', addAgent); 

router.get('/', getAllAgents);
router.get('/:userId', getAgentByUserId);
router.post('/login', loginAgent);


module.exports = router;
