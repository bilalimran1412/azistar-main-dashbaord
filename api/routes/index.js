const router = require("express").Router();
const user = require("./user");
const bot = require("./bot");

router.use("/auth", user);
router.use("/bot", bot);

module.exports = router;
