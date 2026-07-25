import { listUsers, createUser, deactivateUser } from '../services/user.service.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

const list = async (req, res, next) => {
  try {
    const users = await listUsers();
    return sendSuccess(res, users);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    return sendSuccess(res, user, 201);
  } catch (error) {
    if (error.status === 409) {
      return sendError(res, error.message, 409);
    }
    next(error);
  }
};

const deactivate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deactivateUser(id, req.user.id);
    return sendSuccess(res, result);
  } catch (error) {
    if (error.status === 400) {
      return sendError(res, error.message, 400);
    }
    if (error.status === 404) {
      return sendError(res, error.message, 404);
    }
    next(error);
  }
};

export {
  list,
  create,
  deactivate,
};
