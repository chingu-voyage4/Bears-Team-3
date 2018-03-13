const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  githubId: { required: true, trim: true, type: String },
  userName: { required: true, trim: true, type: String },
  avatarURL: { required: true, trim: true, type: String },
});

mongoose.model('users', userSchema);
