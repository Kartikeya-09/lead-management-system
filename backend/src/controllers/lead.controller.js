import { listLeads, createLead, updateLead, deleteLead, getLeadById } from '../services/lead.service.js';
import { sendSuccess, sendPaginated, sendError } from '../utils/response.utils.js';

const list = async (req, res, next) => {
  try {
    const result = await listLeads(req.query, req.user);
    return sendPaginated(res, result.data, result.total, result.page, result.limit);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const lead = await createLead(req.body, req.user);
    return sendSuccess(res, lead, 201);
  } catch (error) {
    if (error.status === 409) return sendError(res, error.message, 409);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const lead = await getLeadById(req.params.id, req.user);
    return sendSuccess(res, lead);
  } catch (error) {
    if (error.status === 403) return sendError(res, error.message, 403);
    if (error.status === 404) return sendError(res, error.message, 404);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const lead = await updateLead(req.params.id, req.body, req.user);
    return sendSuccess(res, lead);
  } catch (error) {
    if (error.status === 403) return sendError(res, error.message, 403);
    if (error.status === 404) return sendError(res, error.message, 404);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const lead = await updateLead(
      req.params.id,
      { status: req.body.status },
      req.user
    );
    return sendSuccess(res, lead);
  } catch (error) {
    if (error.status === 403) return sendError(res, error.message, 403);
    if (error.status === 404) return sendError(res, error.message, 404);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await deleteLead(req.params.id);
    return sendSuccess(res, result);
  } catch (error) {
    if (error.status === 404) return sendError(res, error.message, 404);
    next(error);
  }
};

export {
  list,
  create,
  getById,
  update,
  updateStatus,
  remove,
};
