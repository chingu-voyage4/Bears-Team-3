const mongoose = require('mongoose');
const checkAuthentication = require('../middleware/checkAuthentication');
const isValidId = require('../utils/isValidId');

const User = mongoose.model('users');
const Activity = mongoose.model('activity');

module.exports = app => {
  //Gets top 50 users by totalPoints
  app.get('/api/leaderboard', async (req, res) => {
    const users = await User.find()
      .select('userName totalPoints')
      .sort({ totalPoints: -1 })
      .limit(49);

    const leaderboard = users.map((user, index) => {
      return { ...user._doc, rank: index + 1 };
    });

    res.send(leaderboard);
  });

  app.get('/api/user/:userName', async (req, res) => {
    const { userName } = req.params;
    try {
      const user = await User.findOne({ userName });
      if (!user) res.status(404).send('User not found');

      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/api/activities/:id', async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(404).send('Invalid Id');

    try {
      const activities = await Activity.find({ _user: id });
      res.send(activities);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  //adds activity and updates users totalPoints
  app.post('/api/activity/new', checkAuthentication, async (req, res) => {
    const { activity, url, title, dateCompleted } = req.body;
    const body = { activity, url, title, dateCompleted };

    const activityItem = new Activity({
      ...body,
      _user: req.user.id,
    });

    try {
      await activityItem.save();

      req.user.totalPoints += activityItem.points;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  //deletes activity and updates users totalPoints
  app.delete('/api/activity/:id', checkAuthentication, async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(404).send('Invalid Id');

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

  //Updates activity name and users points
  app.patch('/api/activity/:id', checkAuthentication, async (req, res) => {
    const { id } = req.params;
    const { activity, url, title, dateCompleted } = req.body;
    const body = { activity, url, title, dateCompleted };

    if (!isValidId(id)) return res.status(404).send('Invalid Id');

    try {
      const oldActivity = await Activity.findOne({
        _id: id,
        _user: req.user.id,
      });

      req.user.totalPoints -= oldActivity.points;

      Object.keys(body).forEach(key => {
        oldActivity[key] = body[key];
      });

      const newActivity = await oldActivity.save();

      req.user.totalPoints += newActivity.points;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
