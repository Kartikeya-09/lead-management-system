import express from 'express';
import { body } from 'express-validator';
import { validateBody } from '../middlewares/validate.middleware.js';
import { capture } from '../controllers/capture.controller.js';

const router = express.Router();

const captureValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('company').notEmpty().withMessage('Company is required'),
];

router.post('/', validateBody(captureValidation), capture);

export default router;
