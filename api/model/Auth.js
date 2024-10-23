const mongoose = require('mongoose')
const { UserModel } = require('./User')

const objectId = mongoose.Schema.Types.ObjectId

const authSchema = new mongoose.Schema(
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
    service: {
      type: String,
      enum: ['sendgrid', 'webhook'],
      required: true,
    },
    auth: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    config: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true, versionKey: false }
)

const AuthModal = mongoose.model('Auth', authSchema)
module.exports = { AuthModal }
