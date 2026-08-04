import express from 'express';

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

export default app;
