const { User } = require("../handlers");
const router = require("express").Router();


const { Auth } = require("../middleware");

const handlers = new User();

router.post("/login", handlers.login);
router.post("/signup", handlers.signUp);

module.exports = router;
