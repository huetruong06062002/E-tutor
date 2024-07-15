const express = require('express');
const { approveContent, handleComplaints, manageReviews } = require('../controllers/moderatorController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/contents/approval', approveContent);
router.post('/complaints', handleComplaints);
router.get('/reviews/manage', manageReviews);

module.exports = router;
