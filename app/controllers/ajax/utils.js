var crypto = require('crypto');
Object.values = Object.values ? Object.values : (o) => Object.keys(o).map((i) => o[i]);
var utils = {

    strHash: function(str) {
        return crypto.createHash('md5').update(str).digest('hex');
    }
}

module.exports = utils;
