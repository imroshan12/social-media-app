import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/userModel';
import { auth } from '../middlewares/auth';
import { JWT_EXPIRES, JWT_SECRET } from '../../config/keys';

const router = express.Router();

// @route   GET api/auth
// @desc    get user
// Access   Public

router.get('/', auth, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// Access   Public

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
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
  }
);

module.exports = router;

export default router;
