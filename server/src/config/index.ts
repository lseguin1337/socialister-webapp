import * as env from './env.json';

interface DatabaseConfig {
  type: 'mysql' | 'postgres',
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
}

export const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    ...env.database as DatabaseConfig,
    ...(process.env.DB_HOST ? { host: process.env.DB_HOST } : {}),
  },
  jwt: {
    ...env.jwt,
    refreshExpirationTime: 3600 * 24, // 1 Jour
    accessExpirationTime: 120 // 2 min
  }
};