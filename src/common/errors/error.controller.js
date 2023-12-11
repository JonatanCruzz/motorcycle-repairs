import { envs } from '../../config/enviroment/enviroment.js';
import { AppError } from './appError.js';

const handleCastError23505 = () => {
  return new AppError('Duplicate field value: please another value', 400);
};

const handleCastError22P02 = () =>
  new AppError('Invalid data type in database', 400);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again', 401);

const handleJWTError = () =>
  new AppError('Invalid Token. Please login again', 401);

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (envs.NODE_ENV === 'development') sendErrorDev(err, res);

};