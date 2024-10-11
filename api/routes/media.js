const router = require('express').Router()
const { media } = require('../handlers/media')
const { Auth } = require('../middleware')

const protect = new Auth()

router.post(
  '/:nodeId',
  protect.authentication,
  media.single('file'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send('File is required.')
    }
    const serverUrl = `${req.protocol}://${req.get('host')}`
    const fileUrl = `${serverUrl}/media/${req.file.filename}`
    res.send({ fileUrl })
  }
)

module.exports = router
