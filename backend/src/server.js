import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import { validateEnv } from './utils/startup.utils.js';

validateEnv();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('[Database] Connected to MongoDB successfully.');
    app.listen(PORT, () => {
      console.log(`[Server] Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[Database] Failed to connect to MongoDB', err);
    process.exit(1);
  });
