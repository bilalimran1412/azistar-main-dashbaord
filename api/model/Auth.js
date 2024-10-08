const mongoose = require('mongoose')
const { UserModel } = require('./User')

const objectId = mongoose.Schema.Types.ObjectId

const auth = new mongoose.Schema(
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
    secret: { type: String, required: true },
    fromEmail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
)

const AuthModal = mongoose.model('Auth', auth)
module.exports = { AuthModal }
