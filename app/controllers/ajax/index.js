var express = require('express');
var router = express.Router();
var controller = require('./controller');


router.get('/test',controller.testController);


router.post('/user_info',controller.getUserInfo);
router.post('/company_info',controller.getCompanyInfo);


module.exports = router;
