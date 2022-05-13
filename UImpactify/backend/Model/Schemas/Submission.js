const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubmissionSchema = new Schema({
    sId: Schema.Types.ObjectId, // ID of student who submitted
    aId: Schema.Types.ObjectId, // Assignment Id
    link: String,               // link to submission content
    grade: {type: Number, default: 0}               // grade by instructor
});

module.exports = mongoose.model('Submission', SubmissionSchema);
