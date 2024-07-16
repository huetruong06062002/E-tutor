const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/image/:id',userController.getImageById);


// Update profile
router.put('/profile/:id' , userController.updateProfile);

// Change password
router.put('/password/:id', userController.changePassword);

router.get('/user-profile/:id', userController.getUserById);

router.get('/tutors', userController.getTutors);
module.exports = router;
