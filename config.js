module.exports = {
  JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  SALT: process.env.SALT,
  PORT: process.env.PORT || 3000,
  VERSION: "v1",
};
