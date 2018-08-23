const _env = process.env.NODE_ENV || 'dev';

module.exports = {
  port: process.env.PORT || 4000,
  dbURI: process.env.MONGODB_URI || `mongodb://localhost/festival-companion-app-${_env}`,
  secret: process.env.SECRET || 'festival',
  env: _env,
  mapquestApiKey: process.env.MAPQUEST_API_KEY,
  darkskiesApiKey: process.env.DARKSKY_API_KEY
};
