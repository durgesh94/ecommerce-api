import 'reflect-metadata'; // Required for TypeORM to work properly
import 'dotenv/config'; // Load environment variables from .env file
import app from './app';
import { env } from './config/env';
import { AppDataSource } from './config/database';

const PORT = env.PORT || 3000;

async function bootstrap() {
  try {
    await AppDataSource.initialize();

    console.log('Database connection established successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during database connection initialization:', error);

    process.exit(1);
  }
}

bootstrap();
