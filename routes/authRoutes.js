const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');

const checkAuthentication = require('../middleware/checkAuthentication');

const User = mongoose.model('users');
const Activity = mongoose.model('activity');
const Progress = mongoose.model('progress');

module.exports = app => {
  app.get('/auth/github', passport.authenticate('github'));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
      // Workaround to avoid re-rendering & CORS issues Credit @jenovs https://github.com/jenovs & https://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa/29314111#29314111
      res.sendFile('after-auth.html', {
        root: path.join(__dirname, '../public'),
      });
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.delete('/api/current_user', checkAuthentication, async (req, res) => {
    try {
      await Activity.find({ _user: req.user.id }).remove();
      await Progress.find({ _user: req.user.id }).remove();
      await User.find({ _id: req.user.id }).remove();
      res.send({});
    } catch (err) {
      console.log(err);
    }
  });
};
