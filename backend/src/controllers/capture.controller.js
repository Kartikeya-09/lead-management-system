import { captureLead } from '../services/capture.service.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

const capture = async (req, res, next) => {
  try {
    const lead = await captureLead(req.body);
    return sendSuccess(res, lead, 201);
  } catch (error) {
    if (error.status === 409) return sendError(res, error.message, 409);
    next(error);
  }
};

export {
  capture,
};
