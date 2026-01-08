const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { validate, updateProfileSchema } = require('../validators/authValidator');

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/v1/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', getProfile);

// @route   PUT /api/v1/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', validate(updateProfileSchema), updateProfile);

module.exports = router;
