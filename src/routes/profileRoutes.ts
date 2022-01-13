import express from 'express';
import { check } from 'express-validator';
import { auth } from '../middlewares/auth';
import checkObjectId from '../middlewares/checkObjectId';
const router = express.Router();
import * as profileController from '../controllers/profileController';

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, profileController.getMyProfile);

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  profileController.createProfile
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', profileController.getAllProfiles);

// @route    GET api/profile/query/:query
// @desc     Get profiles by query
// @access   Public
router.get('/query/:query?', profileController.getProfileByQuery);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  profileController.getProfile
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, profileController.deleteAccount);

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  profileController.addEducation
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth, profileController.deleteEducation);

export default router;
