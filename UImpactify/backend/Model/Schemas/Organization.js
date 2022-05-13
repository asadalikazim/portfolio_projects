const mongoose = require('mongoose');

const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: String, //name of oopertunity
  about: String,
  website: String,
  address: String,
  phoneNum: String,
  ownerId: Schema.Types.ObjectId, //org email
  rating: {type: Number, default: 0},

});

module.exports = mongoose.model('Organization', organizationSchema);
