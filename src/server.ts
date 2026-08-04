import 'dotenv/config'; // Load environment variables from .env file
import app from './app';
import { env } from './config/env';

const PORT = env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
