import express from 'express';
import { body } from 'express-validator';
import { validateBody } from '../middlewares/validate.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { login, register, me } from '../controllers/auth.controller.js';

const router = express.Router();

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/login', validateBody(loginValidation), login);
router.post('/register', validateBody(registerValidation), register);
router.get('/me', verifyJWT, me);

export default router;
