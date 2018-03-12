const passport = require('passport');
const path = require('path');

module.exports = app => {
  app.get('/auth/github', passport.authenticate('github'));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
      res.sendFile(path.join(__dirname, 'after-auth.html'));
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
