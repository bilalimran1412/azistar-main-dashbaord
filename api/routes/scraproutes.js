const express = require('express');
const router = express.Router();
const scrapDataSiteController = require('../handlers/scrapDataSiteHandler');

router.get('/:userId', scrapDataSiteController.getDataByUserId);
router.post('/addurl', scrapDataSiteController.addUrl);
router.get('/', scrapDataSiteController.getAllData);
router.delete('/deleteurl/:id', scrapDataSiteController.deleteUrl);
router.get('/status/:id', scrapDataSiteController.getStatusById);

module.exports = router;
