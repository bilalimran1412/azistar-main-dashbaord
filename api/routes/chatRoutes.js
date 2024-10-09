// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const { handleChat, intents } = require('../handlers/chatHandler');

router.post('/', handleChat);
router.get('/intents', intents);

module.exports = router;
