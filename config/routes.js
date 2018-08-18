// Initial requires
const express = require('express');
const router = express.Router(); // sets this up as an express Router
const secureRoute = require('../lib/secure-route');

// Require controllers here

const authController = require('../controllers/authController');
const festivalController = require('../controllers/festivalController');
const userController = require('../controllers/userController');
const carShareController = require('../controllers/carShareController');
const commentController = require('../controllers/commentController');
const friendController = require('../controllers/friendController');
const pendingFriendRequestController = require('../controllers/pendingFriendRequestController');
// const searchController = require();
const attendeeController = require('../controllers/attendeeController');
const pendingPassengerRequestController = require('../controllers/pendingPassengerRequestController');
// const passengerController = require('../controllers/passengerController');






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

router.route('/festivals/:festivalId/attendees')
  .get(attendeeController.index)
  .post(attendeeController.create); //this adds the festival to the users list, and
// the user to the attendees list of the festival

router.route('/festivals/:festivalId/attendees/:attendeeId')
  .delete(attendeeController.delete);

////////////////////////////// Car share routes ///////////////////////////////

router.route('/festivals/:id/carShares')
  .get(carShareController.index)
  .post(secureRoute, carShareController.create);

router.route('/festivals/:festivalId/carShares/:carShareId')
  .all(secureRoute)
  .get(carShareController.show)
  .put(carShareController.update)
  .delete(carShareController.delete);
//maybe on delete, it can send out a message to all passengers that 'this
//car share has been removed.'

// router.route('/festivals/:festivalId/carShares/:carShareId/passengers')
//   .get(carShareController.passengerIndex);

router.route('/festivals/:festivalId/carShares/:carShareId/comments')
  .post(commentController.getToken, commentController.create);

router.route('/festivals/:festivalId/carShares/:carShareId/comments/:commentId')
  .delete(commentController.delete);

////////////////////////////// User routes ////////////////////////////////



router.route('/user/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);


////////////////////////////// Pending friends routes //////////////////////////

router.route('/user/:id/pendingFriends')
  .get(pendingFriendRequestController.getToken, pendingFriendRequestController.index); // Lists pending friends.

router.route('/user/:userId/pendingFriends/:friendId')
  .delete(pendingFriendRequestController.getToken, pendingFriendRequestController.delete); // When you accept a pending friend request.

////////////////////////////// Friends routes ////////////////////////////////

router.route('/user/:id/friends')
  .all(friendController.getToken)
  .get(friendController.index)
  .post(friendController.create); //This adds to users friends
//list, but the friends pending list. User cannot
// view page until friend accepts. When showing index, can make it so that
// You cannot see their profile page unless you are both in each others friends
// lists

router.route('/user/:userId/friends/:friendId')
  .delete(friendController.getToken, friendController.delete); //removing friend

/////////// Festivals attending /Carshare - passenger/ Organised ///////////////

// router.route('/user/:id/festivalsAttending') //Shows festivals user is attending
// .get(userController.festivalsIndex);

// router.route('user/:id/festivalsOrganised') //Shows festivals organised
//   .get(userController.festivalsOrganisedIndex);
//
// router.route('/user/:id/passenger') // Shows car shares user is passenger on
//   .get(userController.passengersIndex);
//
// router.route('user/:id/carSharesOrganised') // Shows car shares the user has organised
//   .get(userController.carSharesOrganisedIndex);
//
// router.route('user/:id/carSharesOrganised/pendingPassengers') //Shows pending passengers to user's car shares
//   .get(pendingPassengerRequestController.index);
//
// router.route('user/:userId/carSharesOrganised/pendingPassengers/:passengerId') //rejects request
//   .delete(pendingPassengerRequestController.delete); //We can change the route of this if necessary

///////////////////////////// Search routes /////////////////////////////////

// router.route('/search/users')
//   .get(searchController);

// might not be necessary if we can filter the front end (ng-filter);

// router.route('/search/festivals')
//   .get(searchController);

// might not be necessary if we can filter the front end (ng-filter);

///////////////////////////////////////////////////////////////////////////////


module.exports = router;
