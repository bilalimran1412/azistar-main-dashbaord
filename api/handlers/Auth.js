const mongoose = require('mongoose')
const { AuthModal, AuthAIFaq } = require('../model')
const Response = require('./Response')

class Auth extends Response {
  createAuth = async (req, res) => {
    try {
      const userId = req.user.id
      const { service, auth: authData, config = {} } = req.body

      const auth = new AuthModal({ service, auth: authData, userId, config })
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
      const { service } = req.params
      const auth = await AuthModal.find({ userId, service }, { config: 0 })

      if (!auth || auth.length === 0) {
        return this.sendResponse(req, res, {
          data: [],
          status: 200,
          message: 'No auth configuration found for this service',
        })
      }

      return this.sendResponse(req, res, {
        data: auth,
        status: 200,
        message: 'Auth List fetched successfully',
      })
    } catch (error) {
      console.error('Error fetching auth config:', error)
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

      const auth = await AuthModal.find({ _id: authID, userId })

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
