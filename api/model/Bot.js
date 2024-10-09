const mongoose = require('mongoose')
const { UserModel } = require('./User')
const customVariableSchema = new mongoose.Schema({
  category: { type: String, required: true },
  label: { type: String, required: true },
  sample: { type: String },
  type: { type: String, required: true },
  value: { type: String, required: true },
})

const bot = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel.modelName,
      required: true,
    },
    diagram: {
      type: String,
    },
    customVariables: [customVariableSchema],
  },
  { timestamps: true, versionKey: false }
)

const BotModal = mongoose.model('Bot', bot)
module.exports = { BotModal }
