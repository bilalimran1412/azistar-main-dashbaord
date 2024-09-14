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
      const bots = await BotModal.find({ userId }).populate("userId").select({ diagram: 0 })
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

  updateBot = async (req, res) => {
    try {
      const userId = req.user.id;
      const botId = req.params.id;
      const updateData = req.body;

      const updatedBot = await BotModal.findOneAndUpdate(
        { userId, _id: botId },
        updateData,
        { new: true, runValidators: true }
      ).populate("userId");

      if (!updatedBot) {
        return this.sendResponse(req, res, {
          data: null,
          status: 404,
          message: "No bot found with this ID",
        });
      }

      return this.sendResponse(req, res, {
        data: updatedBot,
        status: 200,
        message: "Bot updated successfully",
      });
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: "Internal server error",
      });
    }
  }
}

module.exports = { Bot }
