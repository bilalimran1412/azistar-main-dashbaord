const router = require('express').Router()
const { media } = require('../handlers/media')

router.post('/:nodeId', media.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('File is required.')
  }
  const nodeId = req.params.nodeId
  const serverUrl = `${req.protocol}://${req.get('host')}`
  const fileUrl = `${serverUrl}/media/${req.file.filename}`
  res.send({ fileUrl })
})

module.exports = router
