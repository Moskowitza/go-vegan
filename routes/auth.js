const authController = require('../controllers/authcontroller.js');
const db = require('../models');
const passport = require('../config/passport/passport');

module.exports = function (app) {
  // GET routes to render our handlebar pages
  app.get('/signup', authController.getsignup); // redirect to "/singup"
  app.get('/signin', authController.getsignin);
  app.get('/logout', authController.logout);

  app.post('/auth/signin', passport.authenticate('local'), authController.signinpost);

  // POST route to implement passport and sign up a user
  /** Since we need passport, we need to pass it to this method.
   * We can import passport in this script OR pass it from server.js. NOTE WE TAKE IN APP, Passport as params */
  app.post('/auth/signup', authController.authSignup);
  // This comes from the session
  app.get('/auth/check', (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json(false);
    }
  });

  // A function to see if we're logged in to protect the routes
  // we pass it back to the dashboard get route
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/signin');
  }
  app.get('/dashboard', isLoggedIn, authController.dashboard);

  // app.post(
  //   '/auth/signin',
  //   passport.authenticate('local-signin', {
  //     successRedirect: '/dashboard',
  //     failureRedirect: '/signin',
  //   })
  // );
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.json(true);
  });

  // post a new sanctuary: this works
  app.post('/auth/newSanctuary', (req, res) => {
    db.Sanctuary.create(req.body).then(data => {
      res.json(data);
    });
  });
  // this does not seem to work
  app.get('/auth/sanctuaries', (req, res) => {
    console.log('in get /auth/sanctuaries')
    db.Sanctuary.findAll({}).then(data => {
      res.json(data);
    });
  });
  app.post('/auth/saveSearch', (req, res) => {
    const userToAdd = db.User.findOne({ where: { userId: req.body.userId } });
    const sanToAdd = db.Sanctuary.findOne({ where: { sanId: req.body.sanId } });
    Promise.all([userToAdd, sanToAdd])
      .then(results => results[0].addSanctuary(results[1]))
      .then(moreResults => {
        res.json(moreResults);
      });
  });
  app.get('/auth/savedSanctuaries/:id', (req, res) => {
    const mySanctuaries = db.User.findAll({
      where: { userId: req.params.id },
      include: [
        {
          model: db.Sanctuary,
          as: 'Sanctuaries',
          through: {
            attributes: ['name', 'image', 'state'],
          },
        },
      ],
    });
    Promise.all([mySanctuaries])
      .then(result => {
        console.log(`data from savedSanc api call: ${JSON.stringify(result[0][0].Sanctuaries)}`);
        res.json(result[0][0].Sanctuaries);
      })
      .catch(error => res.json(error));
  });
  // Get user's own comments for Dashboard
  app.get('/auth/userComments/:id', (req, res) => {
    const myComments = db.Post.findAll({
      where: { userId: req.params.id },
      include: [
        {
          model: db.Sanctuary,
          as: 'Sanctuary',
          // through: {
          //     attributes: ['sanId'],
          //     where: { userId: req.params.id },
          // }
        },
      ],
    });
    Promise.all([myComments])
      .then(result => {
        console.log('#######################################');
        console.log('#######################################');
        console.log(`########${JSON.stringify(result[0])}`);
        res.json(result[0]);
        // console.log("########" + result[0].Posts)
      })
      .catch(error => res.json(error));
  });
  // Get one sanctuary
  app.get('/api/sanctuary/:id', (req, res) => {
    console.log(`GET ONE SANCTUARY${req.params.id}`);
    db.Sanctuary.findOne({
      where: { sanId: req.params.id },
    })
      .then(result => {
        console.log(`data from profileSanctuary api call: ${JSON.stringify(result)}`);
        res.json(result);
      })
      .catch(error => res.json(error));
  });
  app.post('/auth/newComment', (req, res) => {
    console.log(`in authjs ${JSON.stringify(req.body)}`);
    const userCommenting = db.User.findOne({
      where: { userId: req.body.userId },
    });
    const sanCommented = db.Sanctuary.findOne({
      where: { sanId: req.body.sanId },
    });
    Promise.all([userCommenting, sanCommented])
      .then(result => {
        // results[0].addPost(results[1]);
        db.Post.create(req.body);
      })
      .then(result => {
        console.log(`Result from adding a post: ${JSON.stringify(result)}`);
        res.json(result);
      })
      .catch(error => res.json(error));
  });
  // User Deletes their own comment
  app.delete('/api/deleteComment:id', (req, res) => {
    console.log('$$$$$$$$$$we made it here');
    db.Post.destroy({
      where: { postId: req.params.id },
    })
      .then(result => {
        console.log(`COMMENTS from api call: ${JSON.stringify(result)}`);
        res.json(result);
      })
      .catch(error => res.json(error));
  });

  // get comments for Sanctuary Profile
  app.get('/api/getComments:id', (req, res) => {
    console.log(`GET COMMENTS WITH San ID${JSON.stringify(req.params)}`);
    db.Post.findAll({
      where: { sanId: req.params.id },
    })
      .then(result => {
        console.log(`COMMENTS from api call: ${JSON.stringify(result)}`);
        res.json(result);
      })
      .catch(error => res.json(error));
  });
  app.get('/api/user_data', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};
