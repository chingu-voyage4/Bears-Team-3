const mongoose = require('mongoose');

const checkAuthentication = require('../middleware/checkAuthentication');
const isValidId = require('../utils/isValidId');

const Progress = mongoose.model('progress');

module.exports = app => {
	//Gets user's progress data
	app.get('/api/progress/:userId', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidId(userId)) throw new Error('Invalid id');

			const progress = await Progress.findOne({ _user: userId });
			if (!progress) throw new Error('No progress data found');

			res.send(progress);
		} catch (err) {
			res.status(400).send(err.message);
		}
	});

	//Create user's progress data
	app.post('/api/progress/new', checkAuthentication, async (req, res) => {
		try {
			const existingProgress = await Progress.findOne({ _user: req.user.id });
			if (existingProgress) throw new Error('You already have existing data!');

			const { goal, currentCourse, studyPlan } = req.body;

			if (!goal || !currentCourse || !studyPlan)
				throw new SyntaxError('Missing parameter(s)');

			const progress = new Progress({
				_user: req.user.id,
				goal,
				currentCourse,
				studyPlan,
			});
			await progress.save();

			res.send(progress);
		} catch (err) {
			res.status(400).send(err.message);
		}
	});

	//Update user's progress data
	app.get('/api/progress/:userName', checkAuthentication, async (req, res) => {
		res.send('Hi there');
	});
};
