const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  name: String,
  description: String,
  instructorId: Schema.Types.ObjectId,
  givingGarden: Boolean, 
  rating: {type: Number, default: 0},
});

module.exports = mongoose.model('Class', classSchema);
