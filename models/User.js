const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  githubId: String,
  userName: String,
  avatarURL: String,
});

mongoose.model('users', userSchema);
