const Tutor = require('../models/Tutor');
const Course = require('../models/Course');
const User = require('../models/User');

// Controllers for Tutors
exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTutorById = async (req, res) => {
  const { id } = req.params;
  try {
    const tutor = await Tutor.findById(id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTutor = async (req, res) => {
  const { userId, description, info, moreProducts } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const tutor = new Tutor({ userId, description, info, moreProducts });
    await tutor.save();
    res.status(201).json({ message: 'Tutor created successfully', tutor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTutor = async (req, res) => {
  const { id } = req.params;
  const { userId, description, info, moreProducts } = req.body;
  try {
    const tutor = await Tutor.findById(id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    tutor.userId = userId || tutor.userId;
    tutor.description = description || tutor.description;
    tutor.info = info || tutor.info;
    tutor.moreProducts = moreProducts || tutor.moreProducts;

    await tutor.save();
    res.json({ message: 'Tutor updated successfully', tutor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTutor = async (req, res) => {
  const { id } = req.params;
  try {
    await Tutor.findByIdAndDelete(id);
    res.json({ message: 'Tutor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Additional Tutor Functions
exports.getTutorCourses = async (req, res) => {
  const { tutorId } = req.params;
  try {
    const courses = await Course.find({ tutor: tutorId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTutorRating = async (req, res) => {
  const { tutorId } = req.params;
  try {
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    const ratings = tutor.ratings;
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
