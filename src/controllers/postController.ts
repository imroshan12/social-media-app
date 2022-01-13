import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/userModel';
import Post from '../models/postModel';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';
import catchAsync from '../utils/catchAsync';

export const createPost = catchAsync(async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findById(req.user.id).select('-password');
  const postData = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
    image: '',
  };

  if (req.files) {
    const file = req.files.file;
    file.name = uuidv4() + file.name.slice(-4);
    await file.mv(
      `C:/hv-bootcamp/social-media-app/client/public/uploads/${file.name}`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      }
    );
    postData.image = `/uploads/${file.name}`;
  }

  const newPost = new Post(postData);

  const post = await newPost.save();

  res.json(post);
});

export const getAllPosts = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  }
);

export const getPost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  }
);

export const editPost = catchAsync(async (req: any, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  // Check user
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  //Update the post
  post.text = req.body.text;
  if (req.files) {
    const file = req.files.file;
    file.name = uuidv4() + file.name.slice(-4);
    await file.mv(
      `C:/hv-bootcamp/social-media-app/client/public/uploads/${file.name}`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      }
    );
    post.image = `/uploads/${file.name}`;
  } else {
    post.image = '';
  }

  //Save the post
  await post.save();

  res.json(post);
});

export const deletePost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  }
);

export const likePost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  }
);

export const unlikePost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  }
);

export const addComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  }
);

export const editComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    comment.text = req.body.text;

    await post.save();

    return res.json(post.comments);
  }
);

export const deleteComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  }
);
