var express = require('express');
var router = express.Router();
var controller = require('./controller');


router.get('/test',controller.testController);


module.exports = router;
