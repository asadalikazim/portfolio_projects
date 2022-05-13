const mongoose = require('mongoose');

const { Schema } = mongoose;

const assignmentSchema = new Schema({
  name: String,
  description: String,
  classId: Schema.Types.ObjectId,
  point: Number,
  duedate: Date,
  link: String
});

module.exports = mongoose.model('Assignment', assignmentSchema);
