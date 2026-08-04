import { DataSource } from 'typeorm';
import { env } from './env';

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,

  synchronize: true, // Set to true only in development, false in production

  logging: true, // Enable query logging for debugging purposes

  entities: ['src/modules/**/*.entity.ts'], 

  migrations: ['src/database/migrations/*.ts'], 
});
