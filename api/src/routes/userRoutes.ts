import express from 'express';
import { check } from 'express-validator';
import * as userController from '../controllers/userController';
import { auth } from '../middlewares/auth';

const router = express.Router();

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 8 or more characters'
  ).isLength({ min: 8 }),
  userController.registerUser
);

// @route    POST api/users/send-request/:id
// @desc     Send friend request
// @access   Private
router.put('/send-request/:id', auth, userController.sendFriendRequest);

// @route    POST api/users/send-request/:id
// @desc     Send friend request
// @access   Private
router.put('/accept-request/:id', auth, userController.acceptFriendRequest);

export default router;
