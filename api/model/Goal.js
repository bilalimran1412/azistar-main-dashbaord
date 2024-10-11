const mongoose = require('mongoose')
const { UserModel } = require('./User')

const objectId = mongoose.Schema.Types.ObjectId

const goal = new mongoose.Schema(
  {
    _id: {
      type: objectId,
      auto: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel.modelName,
      required: true,
    },
    value: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
)

const GoalModal = mongoose.model('Goal', goal)
module.exports = { GoalModal }
