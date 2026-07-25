import 'dotenv/config';
import mongoose from 'mongoose';
import { hashPassword } from './bcrypt.utils.js';
import User from '../models/User.model.js';

const DEFAULT_ADMIN = {
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'password123',
  role: 'Admin',
};

const run = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sales-crm';

  await mongoose.connect(mongoUri);

  const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN.email });

  if (existingAdmin) {
    console.log(`[Seed] Admin already exists: ${DEFAULT_ADMIN.email}`);
    await mongoose.disconnect();
    return;
  }

  const password = await hashPassword(DEFAULT_ADMIN.password);

  await User.create({
    name: DEFAULT_ADMIN.name,
    email: DEFAULT_ADMIN.email,
    password,
    role: DEFAULT_ADMIN.role,
  });

  console.log('[Seed] Admin created successfully');
  console.log(`       Email: ${DEFAULT_ADMIN.email}`);
  console.log(`       Password: ${DEFAULT_ADMIN.password}`);

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error('[Seed] Failed to seed admin user', error);
  try {
    await mongoose.disconnect();
  } catch (disconnectError) {
    console.error('[Seed] Failed to disconnect cleanly', disconnectError);
  }
  process.exit(1);
});