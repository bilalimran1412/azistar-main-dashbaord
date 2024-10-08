const { GoalModal } = require('../model')
const Response = require('./Response')

class Goal extends Response {
  createGoal = async (req, res) => {
    try {
      const userId = req.user.id

      const goal = new GoalModal({ ...req.body, userId })
      await goal.save()
      return this.sendResponse(req, res, {
        data: goal,
        status: 201,
        message: 'Goal created successfully',
      })
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: error,
      })
    }
  }

  getGoalList = async (req, res) => {
    try {
      const userId = req.user.id
      const goals = await GoalModal.find({ userId }).populate('userId')
      return this.sendResponse(req, res, {
        data: goals,
        status: 200,
        message: 'Goal List fetched successfully',
      })
    } catch (error) {
      return this.sendResponse(req, res, {
        data: null,
        status: 500,
        message: 'Internal server error',
      })
    }
  }
  getGoalByID = async (req, res) => {
    try {
      const goalID = req.goalID
      const userId = req.user.id

      const goal = await GoalModal.find({ _id: goalID, userId }).populate(
        'userId'
      )
      return this.sendResponse(req, res, {
        data: goal,
        status: 200,
        message: 'Goal fetched successfully',
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

module.exports = { Goal }
