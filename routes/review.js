const express = require('express');
const { createReview } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Đánh giá gia sư (chỉ học viên được phép)
router.post('/', authMiddleware('student'), createReview);

module.exports = router;
