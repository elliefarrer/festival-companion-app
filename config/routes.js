// Initial requires
const express = require('express');
const router = express.Router(); // sets this up as an express Router
const secureRoute = require('../lib/secure-route');

// Require controllers here

const authController = require();
const festivalController = require();
const userController = require();
const carShareController = require();
const friendController = require();
const searchController = require();






// TODO: Add secureRoutes once tested


//////////////////////////// Register and login ///////////////////////////////

router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

////////////////////////////// Festival routes ///////////////////////////////

router.route('/festivals')
  .get(festivalController.index)
  .post(festivalController.create);

router.route('/festivals/:id')
  .get(festivalController.show)
  .put(festivalController.update)
  .delete(festivalController.delete);

////////////////////////////// Car share routes ///////////////////////////////

router.route('/festivals/:id/carshare')
  .get(carShareController.index)
  .post(carShareController.create);

router.route('/festivals/:id/carshare/:id')
  .get(carShareController.show)
  .put(carShareController.update)
  .delete(carShareController.delete);
//maybe on delete, it can send out a message to all passengers that 'this
//car share has been removed.'

////////////////////////////// User routes ////////////////////////////////

router.route('/festivals/:id/carshare/:id/passengers')
  .get(userController.index);


router.route('/user/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

////////////////////////////// Friends routes ////////////////////////////////

router.route('/user/:id/friends')
  .get(friendController.index);

/////////////////// Festivals attending /Carshare - passenger ///////////////

router.route('/user/:id/festivalsattending')
  .get(userController.index);

router.route('/user/:id/passenger')
  .get(userController.index);

///////////////////////////// Search routes /////////////////////////////////

router.route('/search/users')
  .get(searchController);

// might not be necessary if we can filter the front end (ng-filter);

router.route('/search/festivals')
  .get(searchController);

// might not be necessary if we can filter the front end (ng-filter);

///////////////////////////////////////////////////////////////////////////////


module.exports = router;
