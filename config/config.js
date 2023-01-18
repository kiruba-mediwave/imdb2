const config = {
  username: process.env.DBUSERNAME || "postgres",
  password: process.env.DBPASSWORD || "postgres",
  database: process.env.DB_DATABASE || "testimdb",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "postgres",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "set a secret",
};

module.exports = config;
