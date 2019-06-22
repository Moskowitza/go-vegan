require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();
// middleware : import the passport module and the express-session, both of which we need to handle authentication.

// Then, we import the body-parser module. This extracts the entire body part of an incoming request and exposes it in a format that is easier to work with. In this case, we will use the JSON format.

const passport = require('./config/passport/passport');
// import the dot-env module to handle environment variables.
// var env = require('dotenv').load();

const PORT = process.env.PORT || 3001;
const db = require('./models');

// For bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// AFTER the bodyParser import line we initialize PASSPORT and the express session
// passport session and add them both as middleware. We do this by adding these lines some spaces
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

require('./routes/auth.js')(app);
// load passport strategies

db.sequelize.sync().then(() => {});
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
