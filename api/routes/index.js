const router = require("express").Router();
const user = require("./user");
const diagram = require("./diagram");

router.use("/auth", user);
router.use("/diagram", diagram);

module.exports = router;
