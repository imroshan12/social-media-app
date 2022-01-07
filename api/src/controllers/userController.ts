import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { validationResult } from 'express-validator';
import { JWT_EXPIRES, JWT_SECRET } from '../config/keys';
import User from '../models/userModel';

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar =
      'https:' +
      gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        errors: [{ msg: 'You cannot send friend request to yourself' }],
      });
    }
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.params.id);
    if (!user || !friend) {
      return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }
    if (user.friends.includes(friend.id)) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User is already your friend' }] });
    }
    const findPendingRequests = user.pendingRequests.find(
      (x) => x.id === friend.id
    );
    const findReceivedRequests = user.receivedRequests.find(
      (x) => x.id === friend.id
    );
    if (findPendingRequests) {
      return res.status(400).json({
        errors: [{ msg: 'You have already sent friend request to this user' }],
      });
    }
    if (findReceivedRequests) {
      return res.status(400).json({
        errors: [
          { msg: 'You have already received friend request from this user' },
        ],
      });
    }
    user.pendingRequests.push(friend.id);
    friend.receivedRequests.push(user.id);
    await user.save();
    await friend.save();
    res.status(202).json({ msg: 'Friend request sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.params.id);
    if (!user || !friend) {
      return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }
    if (!user.friends.includes(friend.id)) {
      user.friends.push(friend.id);
      friend.friends.push(user.id);
      user.pendingRequests = user.pendingRequests.filter(
        (x) => x.id !== friend.id
      );
      friend.receivedRequests = friend.receivedRequests.filter(
        (x) => x.id !== user.id
      );
      await user.save();
      await friend.save();
      res.status(202).json({ msg: 'Friend request accepted' });
    }
    res.status(400).json({ errors: [{ msg: 'User is already your friend' }] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
