export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3001',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'durgesh.tambe',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'ecommerce_db',
  },
};
