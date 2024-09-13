const { DiagramModel } = require("../model");
const Response = require("./Response");

class Diagram extends Response {
  createDiagram = async (req, res) => {
    try {
      const newDiagram = new DiagramModel(req.body);
      await newDiagram.save();
      return this.sendResponse(req, res, {
        data: newDiagram,
        status: 201,
        message: "Diagram created successfully",
      });
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
}

module.exports = { Diagram };
