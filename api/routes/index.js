const router = require('express').Router()
const user = require('./user')
const bot = require('./bot')
const media = require('./media')

router.use('/auth', user)
router.use('/bot', bot)
router.use('/media', media)

module.exports = router
