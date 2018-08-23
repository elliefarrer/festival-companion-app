const rp = require('request-promise');
const { mapquestApiKey } = require('../config/environment');

function getMap(req, res, next) {
  rp({
    method: 'GET',
    url: `https://www.mapquestapi.com/geocoding/v1/address?key=${mapquestApiKey}`,
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = getMap;
