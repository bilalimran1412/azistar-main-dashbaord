const { AuthModal, AuthAIFaq } = require('../model')
const Response = require('./Response')

class Auth extends Response {
  createAuth = async (req, res) => {
    try {
      const userId = req.user.id

      const auth = new AuthModal({ ...req.body, userId })
      await auth.save()
      return this.sendResponse(req, res, {
        data: auth,
        status: 201,
        message: 'Auth created successfully',
      })
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: error,
      })
    }
  }

  getAuthList = async (req, res) => {
    try {
      const userId = req.user.id
      const auth = await AuthModal.find({ userId }).populate('userId')
      return this.sendResponse(req, res, {
        data: auth,
        status: 200,
        message: 'Auth List fetched successfully',
      })
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: 'Internal server error',
      })
    }
  }
  getAuthByID = async (req, res) => {
    try {
      const authID = req.params.id
      const userId = req.user.id

      const auth = await AuthModal.find({ _id: authID, userId }).populate(
        'userId'
      )
      return this.sendResponse(req, res, {
        data: auth,
        status: 200,
        message: 'Auth fetched successfully',
      })
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: 'Internal server error',
      })
    }
  }

  createAIAuthFaq = async (req, res) => {
    try {
      const userId = req.user.id

      const aiFaq = new AuthAIFaq({ ...req.body, userId })
      await aiFaq.save()
      return this.sendResponse(req, res, {
        data: aiFaq,
        status: 201,
        message: 'aiFaqCreated created successfully',
      })
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: error,
      })
    }
  }
  getAIAuthFaqByID = async (req, res) => {
    try {
      const aiFaqID = req.params.id
      const userId = req.user.id

      const aiFaq = await AuthAIFaq.find({ _id: aiFaqID, userId })
      return this.sendResponse(req, res, {
        data: aiFaq,
        status: 200,
        message: 'AI Faq fetched successfully',
      })
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: 'Internal server error',
      })
    }
  }
}

module.exports = { Auth }
