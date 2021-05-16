export const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: "mysql" as 'mysql' | 'postgres',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    ...(process.env.DB_HOST ? { host: process.env.DB_HOST } : {}),
    ...(process.env.DB_DATABASE ? { database: process.env.DB_DATABASE } : {}),
    ...(process.env.DB_USERNAME ? { username: process.env.DB_USERNAME } : {}),
    ...(process.env.DB_PASSWORD ? { password: process.env.DB_PASSWORD } : {}),
  },
  jwt: {
    refreshSecret: "**RefreshSecretToken**",
    accessSecret: "**AccessSecretToken**",
    refreshExpirationTime: 3600 * 24, // 1 Jour
    accessExpirationTime: 120, // 2 min
    ...(process.env.REFRESH_SECRET ? { refreshSecret: process.env.REFRESH_SECRET } : {}),
    ...(process.env.ACCESS_SECRET ? { password: process.env.ACCESS_SECRET } : {}),
  }
};