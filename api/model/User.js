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
    password: {
      type: String,
      required: true,
      select: false
    },
    website: {
      type: String,  // Use String for URLs
      validate: {
        validator: function(v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Simple URL validation
        },
        message: props => `${props.value} is not a valid URL!`
      }
    }
  },
  {
    versionKey: false,
  }
)


user.methods.matchPassword = async function (enteredPassword) {
  console.log('Entered Password:', enteredPassword);
  console.log('Stored Hashed Password:', this.password);
  const match = await bcrypt.compare(enteredPassword, this.password);
  console.log('Password Match Result:', match);
  return match;
};


user.pre('save', async function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      console.log('Hashed Password:', this.password); // Log hashed password
      next();
  } catch (error) {
      next(error);
  }
});


const UserModel = mongoose.model('Users', user);
module.exports = { UserModel }