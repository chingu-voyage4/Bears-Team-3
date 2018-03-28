const mongoose = require('mongoose');
const _ = require('lodash');
const checkAuthentication = require('../middleware/checkAuthentication');
const isValidId = require('../utils/isValidId');

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

			req.user.totalPoints += activity.points;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(400).send(err);
		}
	});

	//deletes activity and updates users totalPoints
	app.delete('/api/activity/:id', checkAuthentication, async (req, res) => {
		const { id } = req.params;
		if (!isValidId(id)) return res.status(400).send('Invalid Id');

		try {
			const activity = await Activity.findOneAndRemove({
				_id: id,
				_user: req.user.id,
			});
			if (!activity)
				return res
					.status(404)
					.send('Could not find an activity belonging to you');

			const newTotal =
				req.user.totalPoints - activity.points > 0
					? req.user.totalPoints - activity.points
					: 0;

			req.user.totalPoints = newTotal;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(400).send({ err });
		}
	});
};
