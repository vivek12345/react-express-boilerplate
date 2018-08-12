module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  GOOGLE_CLIENT_ID: process.env.DASHBOARD_APP_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET
};
