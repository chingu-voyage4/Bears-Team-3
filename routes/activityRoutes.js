const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('users');
module.exports = app => {
	app.get('/api/leaderboard', async (req, res) => {
		const users = await User.find().select('userName totalPoints');
		const leaderboard = _.chain(users)
			.sortBy('totalPoints')
			.reverse()
			.slice(0, 49)
			.value();
		res.send(leaderboard);
	});
};
