const router = require("express").Router();

const { Bot } = require("../handlers");
const { Auth } = require("../middleware");

const handlers = new Bot();
const protect = new Auth()

router.route("/").post(protect.authentication, handlers.createBot);


module.exports = router;
