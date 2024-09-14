const { Bot } = require("../handlers");
const router = require("express").Router();

const { Auth } = require("../middleware");

const handlers = new Bot();
const protect = new Auth()

router.route("/").post(protect.authentication, handlers.createBot);
router.route("/list").get(protect.authentication, handlers.getBotList);
router.route("/:id/copy").get(protect.authentication, handlers.getBotDiagramCopy);


module.exports = router;
