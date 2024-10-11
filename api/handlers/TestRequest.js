const { axiosInstance } = require('../utils/axios')
const Response = require('./Response')

class TestRequest extends Response {
  sendRequest = async (req, res) => {
    const { url, data } = req.body

    if (!url) {
      return this.sendResponse(req, res, {
        data: null,
        status: 400,
        message: 'URL required',
      })
    }

    try {
      const axiosResponse = await axiosInstance.post(url, data || {})
      return this.sendResponse(req, res, {
        status: 200,
        data: {
          response: {
            data: axiosResponse.data,
            status: axiosResponse.status,
          },
        },
        message: 'Request successful',
      })
    } catch (error) {
      console.error('Error sending request:', error.message)
      return this.sendResponse(req, res, {
        status: 500,
        message: 'Failed to send request',
        data: error.response ? error.response.data : error.message,
      })
    }
  }
}

module.exports = {
  TestRequest,
}
