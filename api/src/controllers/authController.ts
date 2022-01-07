import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/userModel';
import { JWT_EXPIRES, JWT_SECRET } from '../config/keys';
import catchAsync from '../utils/catchAsync';

export const getUser = catchAsync(async (req: any, res: any, next) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      errors: [{ msg: 'Invalid Credentials.' }],
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ msg: 'Invalid Credentials.' }],
    });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES }, (err, token) => {
    if (err) throw err;
    return res.json({ token });
  });
};
