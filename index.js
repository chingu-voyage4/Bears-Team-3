const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// connect to mongo on mlab
mongoose.connect(keys.mongoURI);

const app = express();

/** Middleware in the next 4 here, before a request from the browser goes to route handlers **/

// Parse application/json
app.use(bodyParser.json());

// Extract/add cookie data
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    keys: [keys.cookieKey],
  })
);

// Initialize passport middleware
app.use(passport.initialize());

// Pull user id from cookie data
app.use(passport.session());

// Send request to route handlers
require('./routes/authRoutes')(app);

// Start the server on a dynamic port or 5000 if local
const PORT = process.env.PORT || 5000;
app.listen(PORT);
