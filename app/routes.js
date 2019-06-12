var controllers = require(_dir.DIR_CONTROLLERS);
var express = require('express');

module.exports = function(app, passport) {
    app.use('/dist', require('compression')(), express.static(__dirname + '/dist'));
    app.use('/src', express.static(__dirname + '/src', { maxAge: 10000 }));

    app.use('/ajax', controllers.AjaxController);

    app.get("/health", function(req, res) {
        res.send("Application is up and running!!");
    });

    app.get("/robots.txt", function(req, res) {
        res.send("User-agent: *\nDisallow: /");
    });

    app.get("/*", function(req, res) {
        res.send("Path doesn't exist");
    });
};
