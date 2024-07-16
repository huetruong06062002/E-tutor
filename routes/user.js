const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/image/:id',authMiddleware ,userController.getImageById);


// Update profile
router.put('/profile/:id', authMiddleware, userController.updateProfile);

// Change password
router.put('/password/:id', authMiddleware, userController.changePassword);


module.exports = router;
