import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';
import { JWT_SECRET } from '../config/keys';

export const auth = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  // Get token from header
  const token: string = req.headers['authorization'];
  console.log(token);

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  console.log(JWT_SECRET);

  try {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
