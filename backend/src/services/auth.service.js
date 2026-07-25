import User from '../models/User.model.js';
import { comparePassword } from '../utils/bcrypt.utils.js';
import { signToken } from '../utils/jwt.utils.js';
import { createUser } from './user.service.js';

const login = async (email, password) => {
  const user = await User.findOne({ email, isActive: true });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const token = signToken({ id: user._id.toString(), role: user.role });
  return { token, user: user.toJSON() };
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.isActive) {
    const error = new Error('User not found or inactive');
    error.status = 401;
    throw error;
  }
  return user.toJSON();
};

const register = async ({ name, email, password }) => {
  const user = await createUser({
    name,
    email,
    password,
    role: 'Member',
  });

  const token = signToken({ id: user._id.toString(), role: user.role });
  return { token, user };
};

export {
  login,
  register,
  getMe,
};
