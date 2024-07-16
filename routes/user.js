const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/image/:id', userController.getImageById);

module.exports = router;
