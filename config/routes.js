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
const sessionController = require('../controllers/sessionController');
// const searchController = require();
const attendeeController = require('../controllers/attendeeController');
const pendingPassengerRequestController = require('../controllers/pendingPassengerRequestController');
const passengerController = require('../controllers/passengerController');






// TODO: Add secureRoutes once tested


//////////////////////////// Register and login ///////////////////////////////

router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

router.route('/sessions/new')
  .get(sessionController.new); // Show the form
router.route('/sessions')
  .post(sessionController.create); // Create the user

router.route('/sessions/delete')
  .get(sessionController.delete);

////////////////////////////// Festival routes ///////////////////////////////



router.route('/festivals')
  .get(festivalController.index)
  .post(festivalController.create);

router.route('/festivals/:id')
  .get(festivalController.show)
  .put(festivalController.update)
  .delete(festivalController.delete);


////////////////////////// Attendee routes ///////////////////////////////////


router.route('/festivals/:festivalId/attendees')
  .get(attendeeController.index)
  .post(attendeeController.create) //this adds the festival to the users list, and
  .delete(attendeeController.delete);
// the user to the attendees list of the festival


////////////////////////////// Car share routes ///////////////////////////////



router.route('/festivals/:id/carShares')
  .get(carShareController.index)
  .post(/*secureRoute,*/ carShareController.create);

router.route('/festivals/:festivalId/carShares/:carShareId')
  // .all(secureRoute)
  .get(carShareController.show)
  .put(carShareController.update)
  .delete(carShareController.delete);
//maybe on delete, it can send out a message to all passengers that 'this
//car share has been removed.'



///////////////////////////// Passenger Routes //////////////////////////////




router.route('/festivals/:festivalId/carShares/:carShareId/passengers')
  .all(secureRoute)
  .get(passengerController.index)
  .post(passengerController.create);


router.route('/festivals/:festivalId/carShares/:carShareId/passengers/:passengerId')
  .delete(secureRoute, passengerController.delete);



/////////////////////// Pending passenger routes /////////////////////////////



router.route('/festivals/:festivalId/carShares/:carShareId/pendingPassengers') //Shows pending passengers to user's car shares, only organiser can see this.
  .get(pendingPassengerRequestController.index);

router.route('/festivals/:festivalId/carShares/:carShareId/pendingPassengers/:passengerId')
  .post(pendingPassengerRequestController.create)//accepts request
// only organiser can do this.
  .delete(pendingPassengerRequestController.delete); //We can change the route of this if necessary,rejects request - only organiser can do this.



//////////////////////////Comment routes ////////////////////////////////////////



router.route('/festivals/:festivalId/carShares/:carShareId/comments')
  .post(commentController.create);

router.route('/festivals/:festivalId/carShares/:carShareId/comments/:commentId')
  .delete(commentController.delete);



////////////////////////////// User routes ////////////////////////////////



router.route('/user/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);


////////////////////////////// Pending friends routes //////////////////////////



router.route('/user/:id/pendingFriends')
  .get(pendingFriendRequestController.index); // Lists pending friends.

router.route('/user/:userId/pendingFriends/:friendId')
  .delete(pendingFriendRequestController.delete); // When you accept a pending friend request.



////////////////////////////// Friends routes ////////////////////////////////

router.route('/user/:id/friends')
  .get(friendController.index);


router.route('/user/:userId/friends/:friendId')
  .delete(friendController.delete) //removing friend
  .post(friendController.create); //This adds to users friends
//list, but the friends pending list. User cannot
// view page until friend accepts. When showing index, can make it so that
// You cannot see their profile page unless you are both in each others friends
// lists


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


///////////////////////////// Search routes /////////////////////////////////

// router.route('/search/users')
//   .get(searchController);

// might not be necessary if we can filter the front end (ng-filter);

// router.route('/search/festivals')
//   .get(searchController);

// might not be necessary if we can filter the front end (ng-filter);

///////////////////////////////////////////////////////////////////////////////


module.exports = router;
