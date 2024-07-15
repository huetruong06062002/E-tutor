const express = require('express');
const { searchTutors, sendMessage, bookService, leaveReview } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/tutors/search', searchTutors);
router.post('/messages', sendMessage);
router.post('/bookings', bookService);
router.post('/reviews', leaveReview);

module.exports = router;
