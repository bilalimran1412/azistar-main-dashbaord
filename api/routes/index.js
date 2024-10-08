const router = require('express').Router()
const user = require('./user')
const bot = require('./bot')
const media = require('./media')
const goal = require('./goal')
const auth = require('./auth')

router.use('/auth', user)
router.use('/bot', bot)
router.use('/media', media)
router.use('/goal', goal)
router.use('/auth', auth)

module.exports = router
