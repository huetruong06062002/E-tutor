const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes for User CRUD
router.get('/users', authMiddleware('admin'), adminController.getAllUsers);
router.get('/users/:id', authMiddleware('admin'), adminController.getUserById);
router.post('/users', authMiddleware('admin'), adminController.createUser);
router.put('/users/:id', authMiddleware('admin'), adminController.updateUser);
router.delete('/users/:id', authMiddleware('admin'), adminController.deleteUser);

// Routes for Course CRUD
router.get('/courses', authMiddleware('admin'), adminController.getAllCourses);
router.get('/courses/:id', authMiddleware('admin'), adminController.getCourseById);
router.post('/courses', authMiddleware('admin'), adminController.createCourse);
router.put('/courses/:id', authMiddleware('admin'), adminController.updateCourse);
router.delete('/courses/:id', authMiddleware('admin'), adminController.deleteCourse);

module.exports = router;
