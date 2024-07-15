const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

// GET /api/courses - Lấy danh sách tất cả các khóa học
router.get('/', coursesController.getAllCourses);

// GET /api/courses/:id - Lấy thông tin của khóa học theo id
router.get('/:id', coursesController.getCourseById);

// POST /api/courses - Tạo mới khóa học
router.post('/', coursesController.createCourse);

// PUT /api/courses/:id - Cập nhật thông tin của khóa học
router.put('/:id', coursesController.updateCourse);

// DELETE /api/courses/:id - Xóa khóa học
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
