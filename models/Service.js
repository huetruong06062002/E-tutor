const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  videoURL: String
});

module.exports = mongoose.model('Service', serviceSchema);
