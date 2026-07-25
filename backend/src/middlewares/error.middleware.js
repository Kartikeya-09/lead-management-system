import { sendError } from '../utils/response.utils.js';

const globalErrorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.path}`, err);

  if (err.name === 'ValidationError') {
    const fields = {};
    for (const field in err.errors) {
      fields[field] = err.errors[field].message;
    }
    return sendError(res, 'Validation failed', 422, fields);
  }

  if (err.code === 11000) {
    return sendError(res, 'Duplicate key error', 409);
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return sendError(res, 'Invalid or expired token', 401);
  }

  return sendError(res, 'Internal server error', 500);
};

export {
  globalErrorHandler,
};
