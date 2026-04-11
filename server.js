const express = require("express");
const app = express();
const mongodb = require("./src/config/db");
const bodyParser = require("body-parser");
const errorHandler = require('./src/middleware/errorHandler');
const port = process.env.PORT || 3000;
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");


app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    // This is the best express session ({..}) initialization
    .use(passport.initialize())
    // init passport on every route call.
    .use(passport.session())
    // allow passport to use "express-session"
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({ method: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
    .use(cors({ origin: "*" }))
    .use('/', require('./src/routes/index.js'))
    .use(errorHandler);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL

},
    //use FindOr create ({githubId: profile.id}, function (err, user))
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
))

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    ));


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})


app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logend is as ${req.session.user.displayName}` : "Logged Out") });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });


app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });



if (process.env.NODE_ENV !== "test") {
    mongodb.intMongo((err) => {
        if (err) {
            console.log(err);
        } else {
            app.listen(port, () => {
                console.log(`Database is listening and node is running on port ${port}`);
            });
        }
    });
}

module.exports = app;