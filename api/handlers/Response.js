const { decode, sign } = require("jsonwebtoken");

class Response {
  sendResponse = (req, res, { data, message, status, token }) => {
    try {
      const obj = { data, message, status };
      if (!status) {
        obj.status = 200;
      }
      return res.status(obj.status).json({ ...obj, ...(token && { token }) });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    }
  };
}
module.exports = Response;