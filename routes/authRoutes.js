const passport = require('passport');
const path = require('path');

module.exports = app => {
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build'), function(err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback', passport.authenticate('github'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
