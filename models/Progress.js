const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const ProgressSchema = new Schema({
  goal: requiredString,
  currentCourse: requiredString,
  studyPlan: requiredString,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

mongoose.model('progress', ProgressSchema);
