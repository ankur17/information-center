var express = require('express');
var app = express();

// launch ======================================================================
var port = _config.port;
var server = app.listen(port);
console.log('Your destiny lies on port ' + port);
console.log('http://localhost:' + port);

