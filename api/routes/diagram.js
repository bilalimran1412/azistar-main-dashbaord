const router = require("express").Router();

const { Diagram } = require("../handlers");

const handlers = new Diagram();

router.post("/", handlers.createDiagram);

module.exports = router;
