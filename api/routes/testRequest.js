const { TestRequest } = require('../handlers')
const router = require('express').Router()

const { Auth } = require('../middleware')

const handlers = new TestRequest()
const protect = new Auth()

router.route('/').post(protect.authentication, handlers.sendRequest)

module.exports = router
