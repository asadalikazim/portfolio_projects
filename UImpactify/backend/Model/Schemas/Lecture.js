const mongoose = require('mongoose');

const { Schema } = mongoose;

const lectureSchema = new Schema({
  name: String,
  description: String,
  classId: Schema.Types.ObjectId,
  url: String,
});

module.exports = mongoose.model('Lecture', lectureSchema);