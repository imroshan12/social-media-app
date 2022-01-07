import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import normalizeUrl from 'normalize-url';
import gravatar from 'gravatar';
import { check, validationResult } from 'express-validator';
import { JWT_EXPIRES, JWT_SECRET } from '../../config/keys';
import User from '../models/userModel';

const router = express.Router();

router.get('/', async (req, res) => {
  return res.status(201).json({
    message: 'user recieved',
  });
});

// //REGISTER USER
// router.post('/register', async (req, res) => {
//   try {
//     //HASH PASSWORD
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     //CREATE NEW USER
//     const newUser = await User.create({
//       ...req.body,
//       password: hashedPassword,
//     });

//     //SEND RESPONSE
//     return res.status(201).json({
//       status: 'success',
//       data: {
//         user: newUser,
//       },
//     });
//   } catch (err) {
//     return res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// });

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar =
        // normalizeUrl(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });
      //   { forceHttps: true }
      // );

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

      jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
