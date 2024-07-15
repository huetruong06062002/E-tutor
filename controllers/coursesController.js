const Course = require('../models/Course');

// GET /api/courses - Lấy danh sách tất cả các khóa học
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('tutor', 'info.name info.image');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/courses/:id - Lấy thông tin của khóa học theo id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('tutor', 'info.name info.image');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/courses - Tạo mới khóa học
const createCourse = async (req, res) => {
  const { title, description, tutor, price, image } = req.body;
  const course = new Course({
    title,
    description,
    tutor,
    price,
    image
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/courses/:id - Cập nhật thông tin của khóa học
const updateCourse = async (req, res) => {
  const { title, description, tutor, price, image } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title;
    course.description = description;
    course.tutor = tutor;
    course.price = price;
    course.image = image;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/courses/:id - Xóa khóa học
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.remove();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
