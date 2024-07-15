const express = require('express');
const { manageUsers, updateSystemSettings } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/users', manageUsers);
router.post('/system/settings', updateSystemSettings);

module.exports = router;
