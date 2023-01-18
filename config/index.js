const config = {
  appName: process.env.APP_NAME || "api",
  appPort: process.env.APP_PORT || 3000,
  jwtSecretKey: process.env.JWT_SECRET_KEY || "set a secret",
};
module.exports = config;
