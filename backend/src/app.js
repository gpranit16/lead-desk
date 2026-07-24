import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import leadRoutes from './routes/lead.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import { successResponse } from './utils/apiResponse.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Logging Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Body Parser Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/health', (req, res) => {
  return successResponse(res, 200, 'LeadDesk Pro API is healthy and operational', {
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Catch 404 routes
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

export default app;
