const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');

//const User = mongoose.model('users');

// Turn user into user id in the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Turn user id in the cookie into a user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Github Oauth
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('profile:', profile);
      User.findOne({ githubId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            githubId: profile.id,
            userName: profile.username,
            avatarURL: profile._json.avatar_url,
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
