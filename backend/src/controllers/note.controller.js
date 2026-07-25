import { addNote, getNotes } from '../services/note.service.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

const addNoteController = async (req, res, next) => {
  try {
    const note = await addNote(req.params.id, req.body.text, req.user);
    return sendSuccess(res, note, 201);
  } catch (error) {
    if (error.status === 403) return sendError(res, error.message, 403);
    if (error.status === 404) return sendError(res, error.message, 404);
    if (error.status === 422) return sendError(res, error.message, 422);
    next(error);
  }
};

const listNotesController = async (req, res, next) => {
  try {
    const notes = await getNotes(req.params.id);
    return sendSuccess(res, notes);
  } catch (error) {
    if (error.status === 404) return sendError(res, error.message, 404);
    next(error);
  }
};

export {
  addNoteController as addNote,
  listNotesController as listNotes,
};
