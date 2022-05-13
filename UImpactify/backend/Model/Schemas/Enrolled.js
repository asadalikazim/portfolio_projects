const mongoose = require('mongoose');

const { Schema } = mongoose;

const enrolledSchema = new Schema({
  classId: Schema.Types.ObjectId,  
  studentId: Schema.Types.ObjectId //room to expand if more information is needed (ex: Completion, Grades, progress)
});

module.exports = mongoose.model('Enrolled', enrolledSchema);
