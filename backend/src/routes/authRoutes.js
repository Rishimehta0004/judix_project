const express = require('express');
const router = express.Router();
const { register, login, googleAuth } = require('../controllers/authController');
const { 
  validate, 
  registerSchema, 
  loginSchema, 
  googleAuthSchema 
} = require('../validators/authValidator');

// @route   POST /api/v1/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', validate(registerSchema), register);

// @route   POST /api/v1/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validate(loginSchema), login);

// @route   POST /api/v1/auth/google
// @desc    Google OAuth login/signup
// @access  Public
router.post('/google', validate(googleAuthSchema), googleAuth);

module.exports = router;
