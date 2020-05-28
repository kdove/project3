const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy

const db = require("../models/User");

passport.use(
    new LocalStrategy(
        //signing in via an email
        {
            usernameField: "email"
        },
        function(email, passport, done) {

            //search the database for a user with that username
            db.User.findOne({
                email: email
            }).then(function(user) {

                //if there is no user returned
                if(!user) {

                    //return a false flag and downt authenticate the user
                    return done(null, false, {
                        message: "No username found with that email address"
                    });
                }

                //if the user returned does not pass the password check
                else if(!user.validPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect password"
                    });
                }

                //otherwise authenticate the user
                return done(null, user);
            });
        }
    )
);

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

//export the passport
module.exports = passport;
