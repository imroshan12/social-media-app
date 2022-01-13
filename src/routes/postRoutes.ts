import express from 'express';
import { check } from 'express-validator';
import { auth } from '../middlewares/auth';
import checkObjectId from '../middlewares/checkObjectId';
import * as postController from '../controllers/postController';

const router = express.Router();

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  postController.createPost
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, postController.getAllPosts);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), postController.getPost);

// @route    PUT api/posts/:id
// @desc     Update a post
// @access   Private
router.put(
  '/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  postController.editPost
);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], postController.deletePost);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), postController.likePost);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), postController.unlikePost);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  postController.addComment
);

// @route    PUT api/posts/comment/:id/:comment_id
// @desc     Edit comment
// @access   Private
router.put(
  '/comment/:id/:comment_id',
  auth,
  check('text', 'Text is required').notEmpty(),
  postController.editComment
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, postController.deleteComment);

export default router;
