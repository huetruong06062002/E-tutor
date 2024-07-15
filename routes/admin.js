const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', authMiddleware('admin'), adminController.getAllUsers);
router.delete('/users/:id', authMiddleware('admin'), adminController.deleteUser);
router.post('/courses', authMiddleware('admin'), adminController.createCourse);
router.delete('/courses/:id', authMiddleware('admin'), adminController.deleteCourse);

module.exports = router;
