const { UserModel } = require("../model");
const Response = require("./Response");
const generateToken = require("../utils/index");
const { isValidObjectId } = require("mongoose");

class User extends Response {

  login = async (req, res) => {
    try {
      const { password, email } = req.body;

      if (!email || !password) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Email or Password Required",
        });
      }

      const userExist = await UserModel.findOne({ email });

      if (!userExist) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Invalid email/Password",
        });
      }

      const isValidPassword = await userExist.matchPassword(password);

      if (!isValidPassword) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Email or Password Incorrect",
        });
      }

      const token = generateToken(userExist._id);

      return this.sendResponse(req, res, {
        status: 200,
        message: "Login successful",
        token: token,
        data: {
          userName: userExist.username,
          email: userExist.email,
        },
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  signUp = async (req, res) => {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Field Missing!",
        });
      }

      const userExist = await UserModel.findOne({ email });

      if (userExist) {
        return this.sendResponse(req, res, {
          status: 403,
          message: "Account Already Exists!",
        });
      }

      const newUser = new UserModel({
        username,
        email,
        password,
      });

      await newUser.save();

      const token = generateToken(newUser._id);

      return this.sendResponse(req, res, {
        status: 201,
        message: "User created!",
        token: token,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };
}
userExist = async (userId) => {
  if (!userId) {
    return false
  } else if (!isValidObjectId(userId)) {
    return false
  }

  const user = await UserModel.findOne({ _id: userId })
  return !!user
}

module.exports = { User, userExist };
