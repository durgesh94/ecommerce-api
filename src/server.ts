import 'dotenv/config'; // Load environment variables from .env file
import app from './app';
import { env } from './config/env';
import { AppDataSource } from './config/database';

const PORT = env.PORT || 3000;

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Error during database connection initialization:', error);
  });


// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
