const mongoose = require('mongoose');
const _ = require('lodash');
const checkAuthentication = require('../middleware/checkAuthentication');

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

	//adds activity and updates users totalPoints
	app.post('/api/activity/new', checkAuthentication, async (req, res) => {
		const body = _.pick(req.body, ['activity']);
		const activity = new Activity({
			activity: body.activity,
			_user: req.user.id,
		});

		try {
			await activity.save();

			const user = await User.findOneAndUpdate(
				{ _id: req.user.id },
				{
					$inc: { totalPoints: activity.points },
				},
				{ new: true }
			);
			res.send(user);
		} catch (err) {
			res.status(400).send(err);
		}
	});
};
