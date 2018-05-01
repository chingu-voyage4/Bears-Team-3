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

ProgressSchema.methods.toJSON = function() {
  const data = this;
  const dataObj = data.toObject();

  const { goal, currentCourse, studyPlan } = dataObj;

  return { goal, currentCourse, studyPlan };
};

mongoose.model('progress', ProgressSchema);
