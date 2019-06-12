var express = require('express');
var router = express.Router();
var controller = require('./controller');


router.get('/test',controller.testController);


router.post('/user_info',controller.getUserInfo);
router.post('/company_info',controller.getCompanyInfo);
router.post('/addcompany_count',controller.addCompanyViewCount);


module.exports = router;
