const rp = require('request-promise');
const { darkskiesApiKey } = require('../config/environment');

function forecast(req, res, next) {
  const reqQuery = req.query;
  rp({
    method: 'GET',
    url: `https://api.darksky.net/forecast/${darkskiesApiKey}/${reqQuery.lat},${reqQuery.lon}`,
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  forecast: forecast
};
