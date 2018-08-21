const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        res.status(401).render('sessions/new', { message: 'Login failed. Please try again.' });
      }
      // Login was successful
      req.flash('primary', `Welcome back ${user.username}, to your home of eating out green 🌱`);
      req.session.userId = user.id;
      res.redirect('/');
    });
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => {
    req.flash('primary', 'You have been logged out');
    res.redirect('/');
  });
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
