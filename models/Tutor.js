const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  ratings: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      rating: { type: String, required: true }
    }
  ],
  info: {
    name: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true }
  },
  moreProducts: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      details: { type: String, required: true }
    }
  ]
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
