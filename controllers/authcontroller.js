// Simlply render pages when asked by our route
// const exports = (module.exports = {});
const db = require('../models');
const passport = require('../config/passport/passport');

exports.getsignup = function (req, res) {
  res.redirect('/signup');
};
exports.getsignin = function (req, res) {
  res.redirect('/signin');
};

exports.signinpost = function (req, res) {
  console.log(`signin post route ${JSON.stringify(req.user)}`);
  // console.log(`req.isAuthenticated()? ${req.isAuthenticated()}`);
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  const { email, firstname, lastname, userId } = req.user;
  const userData = { email, firstname, lastname, userId }
  res.json(userData);
};
exports.authSignup = function (req, res) {
  // console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
  })
    .then(function () {
      res.redirect(307, '/auth/signin');
    })
    .catch(function (err) {
      // console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
};
exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

// dashboard isn't a protected route, which means even if a user is not logged in, they can see it
exports.dashboard = function (req, res) {
  // console.log('dashboard callback');
  res.json(true);
};

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    // console.log('authcontroller destroy session');
    // if the request is to logout, we respond with the home page
    res.redirect('/');
  });
};
