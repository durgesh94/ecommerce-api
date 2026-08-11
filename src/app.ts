import express from 'express';
import pinoHttp from 'pino-http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import userRouter from './modules/user/user.routes';
import { errorHandler } from './common/middleware/error.middleware';
import { logger } from './config/logger';
import { env } from './config/env';

// Create an instance of the Express application
const app = express();

// Order 1: Helmet middleware for security headers
app.use(helmet());

// Order 2: CORS middleware for cross-origin requests
app.use(
  cors({
    origin: env.CLIENT_URL,
  }),
);

// Order 3: Middleware to compress response bodies for all requests
app.use(compression());

// Order 4: Logger middleware
app.use(pinoHttp({ logger })); // This middleware gets executed for every request.

// Order 5: Middleware to parse JSON request bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// user routes
app.use('/api/v1/users', userRouter);

// Error handling middleware
app.use(errorHandler);

export default app;
