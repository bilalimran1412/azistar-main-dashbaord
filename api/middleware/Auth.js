const Response = require("../handlers/Response");
const jwt = require("jsonwebtoken");
const { userExist } = require("../handlers/User");

class Auth extends Response {
  authentication = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return this.sendResponse(req, res, {
        status: 400,
        message: "Un Authorized Request",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          message: "Failed to authenticate token!",
        });
      }
      const userVal = await userExist(user.id)
      if (!userVal) {
        return res.status(403).json({
          status: 403,
          message: "Failed to authenticate token!",
        });
      }
      req.user = user;
      next();
    });
  };
}
module.exports = { Auth };
