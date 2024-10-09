const { User } = require("../handlers");
const router = require("express").Router();


const { Auth } = require("../middleware");

const handlers = new User();

router.post("/login", handlers.login);
router.post("/signup", handlers.signUp);
router.get("/getuser", handlers.getAllUsers);
router.get("/:id", handlers.getUserById);



module.exports = router;