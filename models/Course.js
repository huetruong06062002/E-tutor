const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
