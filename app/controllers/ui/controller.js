var request = require('request');
var services = require(_dir.DIR_SERVICES);

module.exports = {

    main: function(req, res) {
        res.render('main.ejs', { obj: _obj , user:req.user});
    },
};
