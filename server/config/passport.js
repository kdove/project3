const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy

const db = require("../models/User");

const GoogleStrategy = require("passport-google-oauth20").Strategy;


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


// Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = { ...profile };
    return cb(null, profile);
}));

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
app.get("/auth/google/callback",
    passport.authenticate("google"),
        (req, res) => {
            res.redirect("/profile");
        });

//export the passport
module.exports = passport;
