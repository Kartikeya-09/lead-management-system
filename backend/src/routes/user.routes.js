import express from 'express';
import { body } from 'express-validator';
import { validateBody } from '../middlewares/validate.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { list, create, deactivate } from '../controllers/user.controller.js';

const router = express.Router();

// Apply auth and admin role to all user routes
router.use(verifyJWT, requireRole('Admin'));

const userValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role').isIn(['Admin', 'Member']).withMessage('Role must be Admin or Member'),
];

router.get('/', list);
router.post('/', validateBody(userValidation), create);
router.delete('/:id', deactivate);

export default router;
