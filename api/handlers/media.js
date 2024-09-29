const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadDir = 'media/'

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now().toString()
    const ext = path.extname(file.originalname)
    const nodeId = req.params.nodeId
    const fileName = `${nodeId}-${timestamp}${ext}`
    cb(null, fileName)
  },
})

const media = multer({ storage })

module.exports = { media }
