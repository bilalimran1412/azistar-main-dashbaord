const axios = require('axios')

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log('Sending request to:', config.url)
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// )

module.exports = { axiosInstance }
