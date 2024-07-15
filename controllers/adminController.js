const User = require('../models/User');
const Tutor = require('../models/Tutor');
const Course = require('../models/Course');

// Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin một người dùng
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
  const { name, email, password, role, degree, skills, identityInfo } = req.body;
  try {
    const user = new User({ name, email, password, role, degree, skills, identityInfo });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, degree, skills, identityInfo } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;
    user.degree = degree || user.degree;
    user.skills = skills || user.skills;
    user.identityInfo = identityInfo || user.identityInfo;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách tất cả khóa học
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('tutor', 'info.name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin một khóa học
exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id).populate('tutor', 'info.name');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo khóa học
exports.createCourse = async (req, res) => {
  const { title, description, tutorId, price, image } = req.body;
  try {
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    const course = new Course({ title, description, tutor: tutorId, price, image });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin khóa học
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, tutorId, price, image } = req.body;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.tutor = tutorId || course.tutor;
    course.price = price || course.price;
    course.image = image || course.image;

    await course.save();
    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa khóa học
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await Course.findByIdAndDelete(id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
