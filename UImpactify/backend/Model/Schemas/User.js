const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }, // to store registration date
  role: String,
});

module.exports = mongoose.model('User', userSchema);
