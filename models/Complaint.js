const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' }
});

module.exports = mongoose.model('Complaint', complaintSchema);
