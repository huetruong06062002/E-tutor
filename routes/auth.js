const express = require('express');
const { register, login, userInfo } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', userInfo);
module.exports = router;
