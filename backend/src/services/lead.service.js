import mongoose from 'mongoose';
import Lead from '../models/Lead.model.js';
import Activity from '../models/Activity.model.js';

const listLeads = async (queryParams, requestingUser) => {
  const {
    page = 1,
    limit = 10,
    status,
    assignedTo,
    source,
    search,
    sortBy = 'createdAt:desc',
  } = queryParams;

  const filter = { isActive: true };

  // Role-based filtering
  if (requestingUser.role === 'Member') {
    filter.assignedTo = requestingUser.id;
  } else if (assignedTo) {
    filter.assignedTo = assignedTo;
  }

  if (status) filter.status = status;
  if (source) filter.source = source;

  if (search) {
    filter.$text = { $search: search };
  }

  // Sorting
  const [sortField, sortOrder] = sortBy.split(':');
  const sort = { [sortField]: sortOrder === 'desc' ? -1 : 1 };
  if (search) {
    sort.score = { $meta: 'textScore' };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    Lead.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email'),
    Lead.countDocuments(filter),
  ]);

  return { data, total, page, limit };
};

const createLead = async (payload, requestingUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    if (payload.email) {
      const existingLead = await Lead.findOne({ email: payload.email });
      if (existingLead) {
        const err = new Error('Lead with this email already exists');
        err.status = 409;
        throw err;
      }
    }

    const leadData = {
      ...payload,
      createdBy: requestingUser.id,
      status: 'New',
    };

    const [lead] = await Lead.create([leadData], { session });

    await Activity.create(
      [
        {
          leadId: lead._id,
          action: 'Lead Created',
          performedBy: requestingUser.id,
          metadata: { details: 'Lead manually created by Admin' },
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return lead.toJSON();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateLead = async (id, payload, requestingUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const lead = await Lead.findById(id).session(session);
    if (!lead || !lead.isActive) {
      const err = new Error('Lead not found');
      err.status = 404;
      throw err;
    }

    if (
      requestingUser.role === 'Member' &&
      lead.assignedTo?.toString() !== requestingUser.id
    ) {
      const err = new Error('Forbidden: You can only update your assigned leads');
      err.status = 403;
      throw err;
    }

    let action = 'Lead Updated';
    let metadata = {};

    if (payload.status && payload.status !== lead.status) {
      action = 'Status Changed';
      metadata = { previousStatus: lead.status, newStatus: payload.status };
      lead.status = payload.status;
    } else if (
      payload.assignedTo &&
      payload.assignedTo !== lead.assignedTo?.toString()
    ) {
      action = 'Assigned User Changed';
      metadata = {
        previousAssignee: lead.assignedTo,
        newAssignee: payload.assignedTo,
      };
      lead.assignedTo = payload.assignedTo;
    } else {
      // General update
      const updatableFields = ['name', 'email', 'phone', 'company', 'source'];
      updatableFields.forEach((field) => {
        if (payload[field] !== undefined) {
          lead[field] = payload[field];
        }
      });
      metadata = { updatedFields: Object.keys(payload) };
    }

    await lead.save({ session });

    await Activity.create(
      [
        {
          leadId: lead._id,
          action,
          performedBy: requestingUser.id,
          metadata,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    
    // Repopulate for return
    return Lead.findById(id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const deleteLead = async (id) => {
  const lead = await Lead.findById(id);
  if (!lead || !lead.isActive) {
    const err = new Error('Lead not found');
    err.status = 404;
    throw err;
  }

  lead.isActive = false;
  await lead.save();
  return { message: 'Lead deleted successfully' };
};

const getLeadById = async (id, requestingUser) => {
  const lead = await Lead.findById(id)
    .populate('assignedTo', 'name email role')
    .populate('createdBy', 'name email');

  if (!lead || !lead.isActive) {
    const err = new Error('Lead not found');
    err.status = 404;
    throw err;
  }

  if (
    requestingUser.role === 'Member' &&
    lead.assignedTo?._id?.toString() !== requestingUser.id
  ) {
    const err = new Error('Forbidden: Cannot view unassigned lead');
    err.status = 403;
    throw err;
  }

  return lead;
};

export {
  listLeads,
  createLead,
  updateLead,
  deleteLead,
  getLeadById,
};
