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
  database: env.database as DatabaseConfig,
  jwt: {
    refreshSecret: '',
    refreshExpirationTime: '',
    accessSecret: 'myfuckingsecret',
    accessExpirationTime: 3600
  }
};