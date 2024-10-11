// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const { handleChat, intents, livechat } = require('../handlers/chatHandler');

router.post('/', handleChat);
router.post('/live', livechat);
router.get('/intents', intents);

module.exports = router;
