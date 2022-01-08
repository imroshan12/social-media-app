import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/userModel';
import { JWT_EXPIRES, JWT_SECRET } from '../config/keys';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

type payload = {
  user: {
    id: string;
  };
};

export const getUser = catchAsync(
  async (req: any, res: any, next: NextFunction): Promise<void> => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }
);

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
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

  const payload: payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES }, (err, token) => {
    if (err) throw err;
    return res.json({ token });
  });
};
