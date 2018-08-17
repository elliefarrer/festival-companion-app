module.exports = {
  port: process.env.PORT || 4000,
  dbURI: process.env.MONGODB_URI || 'mongodb://localhost/festival-companion-app',
  secret: process.env.SECRET || 'festival',
  env: process.env.NODE_ENV || 'dev'
};
