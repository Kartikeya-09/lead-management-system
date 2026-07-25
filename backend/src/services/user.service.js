import User from '../models/User.model.js';
import Lead from '../models/Lead.model.js';
import { hashPassword } from '../utils/bcrypt.utils.js';

const listUsers = async () => {
  return User.find();
};

const createUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already exists');
    error.status = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);
  
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await user.save();
  return user.toJSON();
};

const deactivateUser = async (id, requestingUserId) => {
  if (id === requestingUserId) {
    const error = new Error('Cannot deactivate your own account');
    error.status = 400;
    throw error;
  }

  const user = await User.findById(id);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  user.isActive = false;
  await user.save();

  // Unassign all leads assigned to this user
  await Lead.updateMany({ assignedTo: id }, { $set: { assignedTo: null } });

  return { message: 'User deactivated successfully' };
};

export {
  listUsers,
  createUser,
  deactivateUser,
};
