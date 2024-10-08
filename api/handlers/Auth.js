const { AuthModal } = require('../model')
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
      const authID = req.authID
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
}

module.exports = { Auth }
