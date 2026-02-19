const express = require('express');
const router = express.Router();
const { loginUser, registerUser, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.route('/profile').put(protect, updateUserProfile);

module.exports = router;
