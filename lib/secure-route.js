const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'No message sent' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  function handleVerification(err, result) {
    if(err) {
      res.status(401).json({ message: 'Invalid token' });
    }
    User
      .findById(result.sub)
      .then(user => {
        if(!user) return res.status(401).json({ message: 'User not found' });
        req.user = user;
        return next();
      });
  }
  jwt.verify(token, secret, handleVerification);
}

module.exports = secureRoute;
