
function parseUrl(url: string) {
  const u = new URL(url);
  return {
    type: u.protocol.replace(/:$/, ''),
    host: u.hostname,
    port: u.port,
    username: u.username,
    password: u.password,
    database: u.pathname.replace(/^\//, ''),
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  };
}

const database = process.env.DATABASE_URL
  ? parseUrl(process.env.DATABASE_URL)
  : {};

export const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: "mysql" as 'mysql' | 'postgres',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    ...database,
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