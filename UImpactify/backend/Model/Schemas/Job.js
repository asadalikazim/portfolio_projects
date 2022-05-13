const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  name: String, //name of oopertunity
  description: String,
  orgId: Schema.Types.ObjectId, //org email
  volunteerOp: Boolean,
  opportunityLink: String
});

module.exports = mongoose.model('Job', jobSchema);
