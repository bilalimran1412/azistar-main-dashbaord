const { axiosInstance } = require('../utils/axios')
const { formatData } = require('../utils/string')
const Response = require('./Response')

class TestRequest extends Response {
  isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (err) {
      return false
    }
  }
  sendRequest = async (req, res) => {
    const { url, data, method, headers } = req.body

    if (!url || !method) {
      return this.sendResponse(req, res, {
        data: null,
        status: 400,
        message: 'Missing required fields',
      })
    }

    try {
      if (!this.isValidUrl(url)) {
        return this.sendResponse(req, res, {
          status: 422,
          data: `${url} is not valid URL`,
          message: 'Enter a valid URL',
        })
      }

      const axiosResponse = await axiosInstance({
        url,
        method,
        data: data || {},
        ...(!headers && { ...req.headers }),
        ...(headers && { ...headers }),
      })
      return this.sendResponse(req, res, {
        status: 200,
        data: {
          response: {
            data: axiosResponse.data,
            status: axiosResponse.status,
          },
          json: formatData(axiosResponse.data),
        },
        message: 'Request successful',
      })
    } catch (error) {
      console.error('Error sending request:', error)
      return this.sendResponse(req, res, {
        status: 500,
        message: 'Failed to send request',
        data: {
          message: error.response ? error.response.data : error.message,
          status: error?.status,
        },
      })
    }
  }
}

module.exports = {
  TestRequest,
}
