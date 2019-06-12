var controllers = require(_dir.DIR_CONTROLLERS);
var express = require('express');

module.exports = function(app, passport) {
    app.use('/dist', require('compression')(), express.static(__dirname + '/dist'));
    app.use('/src', express.static(__dirname + '/src', { maxAge: 10000 }));

    // google auth routes
    app.post('/auth/check', passport.authenticate('local',{
        successRedirect: '/view',
        failureRedirect: '/login'})
    ),function(req, res) {
        res.sent({ user : req.user });
    };


    app.get('/login', function(req, res) {
        res.render('login.ejs', { obj: _obj , user:req.user});
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });


    app.get('/',(req, res)=>{
        // res.redirect('/view');
        if (req.isAuthenticated()) {
            res.redirect('/view');
        } else {
            res.redirect('/login');
        }
    });

    app.use('/view', controllers.UIController);
    app.use('/ajax', controllers.AjaxController);

    app.get("/health", function(req, res) {
        res.send("Application is up and running!!");
    });


    app.get("/*", function(req, res) {
        res.send("Path doesn't exist");
    });
};
