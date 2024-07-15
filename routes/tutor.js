const express = require('express');
const { createService, getServices } = require('../controllers/tutorController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Tạo dịch vụ mới (chỉ gia sư được phép)
router.post('/services', authMiddleware('tutor'), createService);

// Lấy danh sách dịch vụ (công khai)
router.get('/services', getServices);

module.exports = router;
