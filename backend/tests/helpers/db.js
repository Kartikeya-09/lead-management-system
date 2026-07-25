require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const User = require('../../src/models/User.model');
const { signToken } = require('../../src/utils/jwt.utils');
const { hashPassword } = require('../../src/utils/bcrypt.utils');

const connectTestDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
};

const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

const seedUsers = async () => {
  const password = await hashPassword('password123');
  
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@test.com',
    password,
    role: 'Admin',
  });

  const member = await User.create({
    name: 'Member User',
    email: 'member@test.com',
    password,
    role: 'Member',
  });

  const adminToken = signToken({ id: admin._id.toString(), role: admin.role });
  const memberToken = signToken({ id: member._id.toString(), role: member.role });

  return { admin, member, adminToken, memberToken };
};

module.exports = {
  connectTestDB,
  clearDB,
  disconnectDB,
  seedUsers,
};
