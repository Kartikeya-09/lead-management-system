import { validationResult } from 'express-validator';
import { sendError } from '../utils/response.utils.js';

const validateBody = (validationChain) => {
  return [
    ...validationChain,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const fields = {};
        errors.array().forEach((err) => {
          if (err.type === 'field') {
            fields[err.path] = err.msg;
          }
        });
        return sendError(res, 'Validation failed', 422, fields);
      }
      next();
    },
  ];
};

export {
  validateBody,
};
