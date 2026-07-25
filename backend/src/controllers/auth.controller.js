import { login, register, getMe } from '../services/auth.service.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    return sendSuccess(res, result);
  } catch (error) {
    if (error.status === 401) {
      return sendError(res, error.message, 401);
    }
    next(error);
  }
};

const registerController = async (req, res, next) => {
  try {
    const result = await register(req.body);
    return sendSuccess(res, result, 201);
  } catch (error) {
    if (error.status === 409) {
      return sendError(res, error.message, 409);
    }
    next(error);
  }
};

const meController = async (req, res, next) => {
  try {
    const user = await getMe(req.user.id);
    return sendSuccess(res, user);
  } catch (error) {
    if (error.status === 401) {
      return sendError(res, error.message, 401);
    }
    next(error);
  }
};

export {
  loginController as login,
  registerController as register,
  meController as me,
};
