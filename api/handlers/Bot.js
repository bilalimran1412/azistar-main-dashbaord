const { BotModal } = require('../model')
const Response = require('./Response')

class Bot extends Response {
  createBot = async (req, res) => {
    try {
      const userId = req.user.id

      const botObject = new BotModal({ ...req.body, userId })
      await botObject.save()
      return this.sendResponse(req, res, {
        data: botObject,
        status: 201,
        message: 'Bot created successfully',
      })
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: error,
      })
    }
  }

  //getBotList-but-user-specific
  getBotList = async (req, res) => {
    try {
      const userId = req.user.id
      const bots = await BotModal.find({ userId }).populate("userId")
      return this.sendResponse(req, res, {
        data: bots,
        status: 200,
        message: "Bot List fetched successfully",
      });
    } catch (error) {
      console.log(error)
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getBotDiagramCopy = async (req, res) => {
    try {
      const userId = req.user.id
      const bot = await BotModal.find({ userId, _id: req.params.id }).populate("userId")

      if (!bot) {
        return this.sendResponse(req, res, {
          data: null,
          status: 404,
          message: "No bot found under this id",
        });
      }
      return this.sendResponse(req, res, {
        data: bot,
        status: 200,
        message: "Bot fetched successfully",
      });
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: "Internal server error",
      });
    }
  };
}

module.exports = { Bot }
