var crypto = require('crypto');
Object.values = Object.values ? Object.values : (o) => Object.keys(o).map((i) => o[i]);
var utils = {
    now: function() {
        return (new Date().getTime());
    },
    elapsed: function(st, et = utils.now(), den = 1000) {
        return (et - st) / den;
    },
    randomStr: function(len = 6) {
        return crypto.randomBytes(64).toString('hex').slice(0, len);
    },
    generateOrderedId: function() {
        var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
        var lastPushTime = 0;
        var lastRandChars = [];

        return function() {
            var now = new Date().getTime();
            var duplicateTime = (now === lastPushTime);
            lastPushTime = now;

            var timeStampChars = new Array(8);
            for (var i = 7; i >= 0; i--) {
                timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
                now = Math.floor(now / 64);
            }
            if (now !== 0) throw new Error('We should have converted the entire timestamp.');
            var id = timeStampChars.join('');
            if (!duplicateTime) {
                for (i = 0; i < 12; i++) lastRandChars[i] = Math.floor(Math.random() * 64);
            } else {
                for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) lastRandChars[i] = 0;
                lastRandChars[i]++;
            }
            for (i = 0; i < 12; i++) id += PUSH_CHARS.charAt(lastRandChars[i]);
            if (id.length != 20) throw new Error('Length should be 20.');

            return id;
        };
    }(),
    strHash: function(str) {
        return crypto.createHash('md5').update(str).digest('hex');
    },
    passHash: function(str){
        return str
    },
    hash: function(str) {
        var h = 113 * 913,
            i, chr, len;
        if (str.length === 0) return h;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            h = ((h << 5) - h) + chr;
            h |= 0;
        }
        return Math.abs(h);
    },
    cleanData(data) {
        for (var prop in data) {
            if (data.hasOwnProperty(prop) && !isNaN(data[prop]) &&
                !((data[prop] + "").trim() === "" || data[prop] === true || data[prop] === false))
                data[prop] = +data[prop];
            if (data.hasOwnProperty(prop) && (data[prop] === "false" || data[prop] === "true"))
                data[prop] = JSON.parse(data[prop]);
        }
        return data;
    },
    findFirstEmptyAttribute(data, attrs) {
        for (attr in attrs) {
            if (data[attrs[attr]] == null) return attrs[attr];
            if (data[attrs[attr]] === "") return attrs[attr];
        }
        return null;
    },
    generateObject: function(obj, isnew) {
        if (isnew) {
            obj.id = utils.generateOrderedId();
            obj.created_at = utils.now();
        }
        obj.updated_at = utils.now();

        //type cast ints,bools and floats
        obj = utils.cleanData(obj);
        return obj;
    }
}

module.exports = utils;
