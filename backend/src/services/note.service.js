import mongoose from 'mongoose';
import Lead from '../models/Lead.model.js';
import Activity from '../models/Activity.model.js';

const addNote = async (leadId, text, requestingUser) => {
  if (!text || text.trim() === '') {
    const err = new Error('Note text cannot be empty');
    err.status = 422;
    throw err;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const lead = await Lead.findById(leadId).session(session);
    if (!lead || !lead.isActive) {
      const err = new Error('Lead not found');
      err.status = 404;
      throw err;
    }

    if (
      requestingUser.role === 'Member' &&
      lead.assignedTo?.toString() !== requestingUser.id
    ) {
      const err = new Error('Forbidden: Cannot add note to unassigned lead');
      err.status = 403;
      throw err;
    }

    const newNote = {
      text,
      author: requestingUser.id,
    };

    lead.notes.push(newNote);
    await lead.save({ session });

    // The newly pushed note will have an _id we can retrieve
    const createdNote = lead.notes[lead.notes.length - 1];

    await Activity.create(
      [
        {
          leadId: lead._id,
          action: 'Note Added',
          performedBy: requestingUser.id,
          metadata: { noteId: createdNote._id },
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return createdNote;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getNotes = async (leadId) => {
  const lead = await Lead.findById(leadId)
    .populate('notes.author', 'name email')
    .lean();
    
  if (!lead || !lead.isActive) {
    const err = new Error('Lead not found');
    err.status = 404;
    throw err;
  }

  // Return notes sorted by createdAt descending
  return lead.notes.sort((a, b) => b.createdAt - a.createdAt);
};

export {
  addNote,
  getNotes,
};
