import { GeneralError } from '../utils/errors';

export const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      msg: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    msg: err.message,
  });
};
