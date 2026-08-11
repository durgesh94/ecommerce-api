import express from 'express';
import userRouter from './modules/user/user.routes';
import { errorHandler } from './common/middleware/error.middleware';

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
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
