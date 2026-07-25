import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middlewares/error.middleware.js';

// We need to implement these stubs for the app to start
import authRoutes from './routes/auth.routes.js';
import captureRoutes from './routes/capture.routes.js';
import leadRoutes from './routes/lead.routes.js';
import userRoutes from './routes/user.routes.js';
import activityRoutes from './routes/activity.routes.js';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/capture', captureRoutes);

// Protected routes (stubs for now, will add verifyJWT later)
app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

app.use(globalErrorHandler);

export default app;
