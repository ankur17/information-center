var env = process.env.NODE_ENV || 'staging';
console.log('ENVIROMENT = ' + env);
var config = {};
if (env === 'production') {
    config = require('./config.production.js');
} else {
    config = require('./config.staging.js');
}

module.exports = config;
