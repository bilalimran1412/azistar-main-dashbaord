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

      const userExist = await UserModel.findOne({ email }).select('+password');

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
          userId: userExist._id,
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
      const { email, password, website } = req.body;

      if (!email || !password || !website) {
        console.log('please add');
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
        email,
        password,
        website,
      });

      await newUser.save();

      const token = generateToken(newUser._id);

      return this.sendResponse(req, res, {
        status: 201,
        message: "User created!",
        token: token,
        userId: newUser._id
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find().select('-password'); // Exclude password from response
      return this.sendResponse(req, res, {
        status: 200,
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  // Method to get user by ID
  getUserById = async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId || !isValidObjectId(userId)) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Invalid User ID",
        });
      }

      const user = await UserModel.findById(userId).select('-password'); // Exclude password

      if (!user) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "User not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "User retrieved successfully",
        data: user,
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
