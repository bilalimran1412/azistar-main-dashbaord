const { Goal } = require('../handlers')
const router = require('express').Router()

const { Auth } = require('../middleware')

const handlers = new Goal()
const protect = new Auth()

router.route('/').post(protect.authentication, handlers.createGoal)
router.route('/').get(protect.authentication, handlers.getGoalList)
router.route('/:id').get(protect.authentication, handlers.getGoalByID)

module.exports = router
