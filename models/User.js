const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  githubId: { required: true, trim: true, type: String },
  userName: { required: true, trim: true, type: String },
  avatarURL: { required: true, trim: true, type: String },
  totalPoints: { type: Number, required: true, default: 0, min: 0 },
});

mongoose.model('users', userSchema);
