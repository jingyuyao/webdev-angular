const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  courseId: {type: Number, required: true},
  title: {type: String, required: true},
  maxSeats: {type: Number, required: true},
  // This is bad since finding which sections a user is enrolled in
  // will take a long query time. Then again, there is no reason to
  // use MongoDB for things like this except for an assignment.
  enrollments: [mongoose.Schema.Types.ObjectId],
});

const SectionModel = mongoose.model('SectionModel', SectionSchema);

module.exports = SectionModel;
