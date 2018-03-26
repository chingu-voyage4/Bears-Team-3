require('./config/config');

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Activity');
require('./services/passport');

// connect to mongo on mlab
mongoose.connect(process.env.MONGO_URI);

const app = express();

/** Middleware in the next 4 here, before a request from the browser goes to route handlers **/

// Parse application/json
app.use(bodyParser.json());

// Extract/add cookie data
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
		keys: [process.env.COOKIE_KEY],
	})
);

// Initialize passport middleware
app.use(passport.initialize());

// Pull user id from cookie data
app.use(passport.session());

// Send request to route handlers
require('./routes/authRoutes')(app);
require('./routes/activityRoutes')(app);

// Handle client routes in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Start the server on process.env.PORT or 5000 if .env is missing
const PORT = process.env.PORT || 5000;
app.listen(PORT);
