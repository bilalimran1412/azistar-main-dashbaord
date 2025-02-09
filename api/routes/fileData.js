const express = require('express');
const router = express.Router();
const scrapDataSiteController = require('../handlers/scrapDataSiteHandler');
const WebsiteDataController = require('../handlers/WebsiteData');

router.get('/:userId', scrapDataSiteController.getDataByUserId);
router.post('/addurl', scrapDataSiteController.addUrl);
router.get('/', scrapDataSiteController.getAllData);
router.delete('/deleteurl/:id', scrapDataSiteController.deleteUrl);
router.get('/status/:id', scrapDataSiteController.getStatusById);
router.post('/addintent', scrapDataSiteController.addintent);
router.get('/websites/:id', WebsiteDataController.websiteData);
router.get('/website-quwstion/:id', WebsiteDataController.websiteQuestionData);
router.put('/update/:id', WebsiteDataController.updateScrapData);

module.exports = router;
