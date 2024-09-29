const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const objectId = mongoose.Schema.Types.ObjectId

const user = new mongoose.Schema(
  {
    _id: {
      type: objectId,
      auto: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
  },
  {
    versionKey: false,
  }
)

user.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password)
}



user.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const UserModel = mongoose.model('Users', user);
module.exports = { UserModel }