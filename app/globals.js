var fs = require('fs');
module.exports = function() {
    var dir = {};
    dir.DIR_APP = __dirname;
    dir.DIR_CONTROLLERS = dir.DIR_APP + '/controllers';
    dir.DIR_SERVICES = dir.DIR_APP + '/services';
    dir.DIR_KEYS = dir.DIR_APP + '/keys';
    dir.TEMP = dir.DIR_APP + '/temp';

    function authCheck(type, req) {
        //no login or key checks for dev mode
        // if (_config.dev) return true;

        if (type === 'key') {
            var key = req.method == 'GET' ? req.query.key : req.body.key;
            return key === _config.keys.stats_key;
        } else if (type === 'login') {
            if( req.headers['x-auth-token'] ){
                req.user = Object.assign(req.user || {}, {'auth_token':req.headers['x-auth-token']});
            }
            return req.isAuthenticated();
        }
        false;
    }
    
    global._dir = dir;
    global._moduleSource = process.env.MODULE;
    global._hashMap = {};
    global._timeStampHashMap = {};
    global._config = require('../config');
    global._cache = function(req, res, next) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        next();
    }
    
    global._nocache = function(req, res, next) {
        res.setHeader('Cache-Control', 'private, no-cache, no-store');
        next();
    }
    global._auth_login = function(req, res, next) {
        if (authCheck('login', req))
            return next();
        res.redirect('/');
    }

    global._obj = {};
    fs.readFile(dir.DIR_APP + '/dist/public/manifest.json', 'utf8', function(err, data) {
        if (err) throw err;
        global._obj = JSON.parse(data);
    });
};
