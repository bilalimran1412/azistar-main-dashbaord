const mongoose = require('mongoose')
const { UserModel } = require('./User')

const objectId = mongoose.Schema.Types.ObjectId

const authAIFaq = new mongoose.Schema(
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
    prompt: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
)

const AuthAIFaq = mongoose.model('AuthAIFaq', authAIFaq)
module.exports = { AuthAIFaq }
