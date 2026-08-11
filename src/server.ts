import 'reflect-metadata'; // Required for TypeORM to work properly
import 'dotenv/config'; // Load environment variables from .env file
import app from './app';
import { env } from './config/env';
import { AppDataSource } from './config/database';
import { logger } from './config/logger';

const PORT = env.PORT || 3000;

async function bootstrap() {
  try {
    await AppDataSource.initialize();

    logger.info('Database connection established successfully.');

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Error during database connection initialization: ${error}`);

    process.exit(1);
  }
}

bootstrap();
