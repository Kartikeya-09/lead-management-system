import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { listAll } from '../controllers/activity.controller.js';

const router = express.Router();

router.use(verifyJWT, requireRole('Admin'));

router.get('/', listAll);

export default router;
