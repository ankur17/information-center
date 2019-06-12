var LocalStrategy = require('passport-local').Strategy;


module.exports = {
    setup: function(authorize) {
        var passport = require('passport');
        passport.serializeUser(function(user, done) {
            done(null, JSON.stringify(user));
        });

        passport.deserializeUser(function(user, done) {
            done(null, user ? JSON.parse(user) : null);
        });


        passport.use(new LocalStrategy(
            function(username, password, done) {
                let user = {
                    username : username,
                    password : password
                }
                // check if the password is correct

                authorize(user,function(err,user){
                    if( err ){
                      done('Authorization Error');
                    }else{
                      done(null, user);
                    }
                });
                
            }
        ));
        
        return passport;
    }
};
