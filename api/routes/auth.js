const router = require('express').Router()
const { Auth: UserAuth } = require('../middleware')
const { Auth } = require('../handlers')

const handlers = new Auth()
const protect = new UserAuth()

router.route('/').post(protect.authentication, handlers.createAuth)
router.route('/prompt').post(protect.authentication, handlers.createAIAuthFaq)
router.route('/').get(protect.authentication, handlers.getAuthList)
router.route('/:id').get(protect.authentication, handlers.getAuthByID)
router
  .route('/prompt/:id')
  .get(protect.authentication, handlers.getAIAuthFaqByID)

module.exports = router
