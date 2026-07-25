import { getActivitiesForLead, getAllActivities } from '../services/activity.service.js';
import { sendSuccess, sendPaginated } from '../utils/response.utils.js';

const listForLead = async (req, res, next) => {
  try {
    const activities = await getActivitiesForLead(req.params.id);
    return sendSuccess(res, activities);
  } catch (error) {
    next(error);
  }
};

const listAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllActivities(page, limit);
    return sendPaginated(res, result.data, result.total, result.page, result.limit);
  } catch (error) {
    next(error);
  }
};

export {
  listForLead,
  listAll,
};
