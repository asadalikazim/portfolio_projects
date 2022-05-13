const mongoose = require('mongoose');

const { Schema } = mongoose;

const requestSchema = new Schema({
  name: String, //name of the student organzation
  courseName: String,
  description: String, //reason student shoud get in OR organization's specific job request
  courseId: Schema.Types.ObjectId,
  studentId: Schema.Types.ObjectId,
  organizationId: Schema.Types.ObjectId,
  status: String, 
});

module.exports = mongoose.model('GivingGardenRequest', requestSchema);
