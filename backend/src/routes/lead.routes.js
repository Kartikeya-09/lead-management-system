import express from 'express';
import { body } from 'express-validator';
import { validateBody } from '../middlewares/validate.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { list, create, getById, update, updateStatus, remove } from '../controllers/lead.controller.js';
import { addNote, listNotes } from '../controllers/note.controller.js';
import { listForLead } from '../controllers/activity.controller.js';

const router = express.Router();

router.use(verifyJWT);

const createValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Valid email format required'),
];

const updateStatusValidation = [
  body('status')
    .isIn(['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'])
    .withMessage('Invalid status value'),
];

router.get('/', requireRole('Admin', 'Member'), list);
router.post('/', requireRole('Admin'), validateBody(createValidation), create);
router.get('/:id', requireRole('Admin', 'Member'), getById);
router.put('/:id', requireRole('Admin', 'Member'), update);
router.delete('/:id', requireRole('Admin'), remove);
router.put(
  '/:id/status',
  requireRole('Member'),
  validateBody(updateStatusValidation),
  updateStatus
);

// Notes routes
const noteValidation = [
  body('text').notEmpty().withMessage('Note text is required'),
];
router.post('/:id/notes', requireRole('Admin', 'Member'), validateBody(noteValidation), addNote);
router.get('/:id/notes', requireRole('Admin', 'Member'), listNotes);

// Activity route for lead
router.get('/:id/activities', requireRole('Admin'), listForLead);

export default router;
