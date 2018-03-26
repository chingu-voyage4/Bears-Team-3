const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('users');
const Activity = mongoose.model('activity');

module.exports = app => {
	//Gets top 50 users by totalPoints
	app.get('/api/leaderboard', async (req, res) => {
		const users = await User.find().select('userName totalPoints');
		const leaderboard = _.chain(users)
			.sortBy('totalPoints')
			.reverse()
			.slice(0, 49)
			.value();
		res.send(leaderboard);
	});

	app.post('/api/activity/new', async (req, res) => {
		const body = _.pick(req.body, ['activity', 'user']);
		const activity = new Activity({
			activity: body.activity,
			_user: body.user,
		});
		await activity.save();
		res.send('Saved activity');
	});
};
