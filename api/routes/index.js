const router = require("express").Router();
const user = require("./user");
const bot = require("./bot");
const MessageRoutes = require("./messageRoutes")
const CustomerRoutes = require("./customerRoutes")
const AgentRoutes = require("./agentRoutes")
const ScrapData = require("./scraproutes")
const Chat = require("./chatRoutes")
const media = require('./media')


router.use("/auth", user);
router.use("/bot", bot);
router.use("/message", MessageRoutes);
router.use("/customers", CustomerRoutes);
router.use("/agents", AgentRoutes);
router.use("/scrap_data", ScrapData);
router.use("/chat", Chat);
router.use('/media', media)


module.exports = router;
