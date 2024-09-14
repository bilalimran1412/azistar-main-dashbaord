const { BotModal } = require('../model')
const Response = require('./Response')

class Bot extends Response {
  createBot = async (req, res) => {
    try {
      const botObject = new BotModal(req.body)
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
}

module.exports = { Bot }
