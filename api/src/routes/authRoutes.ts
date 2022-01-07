import express from 'express';
import { check } from 'express-validator';
import { auth } from '../middlewares/auth';
import * as authController from '../controllers/authController';

const router = express.Router();

// @route   GET api/auth
// @desc    get user
// Access   Public
router.get('/', auth, authController.getUser);

// @route   POST api/auth
// @desc    Login user & get token
// Access   Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.loginUser
);

export default router;
