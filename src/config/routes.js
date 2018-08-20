function Router($stateProvider, $urlRouterProvider) {

  function secureState($auth, $q, $state, $rootScope) {
    return new $q(resolve => {
      if($auth.isAuthenticated()) return resolve();
      // User not logged in
      // Create a flash message
      $rootScope.$broadcast('flashMessage',{ //Doesn't have to be called flash message, just has to be same as $on
        type: 'warning',
        content: 'Please log in to continue'
      });
      $state.go('login');
    });
  }
  $stateProvider
    .state('about', {
      templateUrl: './views/about.html',
      url: '/about'
    })
    .state('home', {
      templateUrl: './views/home.html',
      url: '/'
    })
    .state('festivalsIndex', {
      templateUrl: './views/festivals/index.html',
      url: '/whiskeys',
      controller: 'FestivalsIndexCtrl',
      resolve: {
        secureState, //result block!
        festivals: function($http) {
          return $http({
            method: 'GET',
            url: '/api/festivals'
          })
            .then(res => res.data);
        }
      }
    })
    .state('festivalsShow', {
      templateUrl: './views/festivals/show.html',
      url: '/festivals/:id', // id is now a parameter of the state
      controller: 'festivalsShowCtrl'
    })
    .state('festivalsNew', {
      templateUrl: './views/festivals/new.html',
      url: '/festivals/new',
      controller: 'FestivalsNewCtrl'
    })
    .state('festivalsEdit', {
      templateUrl: './views/festivals/edit.html',
      url: '/festivals/:id/edit',
      controller: 'FestivalsEditCtrl'
    })
    .state('login', {
      templateUrl: './views/auth/login.html',
      url: '/login',
      controller: 'AuthLoginCtrl'
    })
    .state('register', {
      templateUrl: './views/auth/register.html',
      url: '/register',
      controller: 'AuthRegisterCtrl'
    })
    .state('carShareIndex', {
      templateUrl: './views/carShares/index.html',
      url: '/festivals/:id/carshares',
      controller: 'CarShareCtrl'
    })
    .state('carShareShow', {
      templateUrl: './views/carShares/show.html',
      url: '/festivals/:id/carshares/:id',
      controller: 'CarShareCtrl'
    })
    .state('carShareEdit', {
      templateUrl: './views/carShares/edit.html',
      url: '/festivals/:id/carshares/:id',
      controller: 'CarShareCtrl'
    })
    .state('friend', {
      templateUrl: './views/friends/index.html',
      url: '/user/:id/friends/:id',
      controller: 'friendsCtrl'
    })
    .state('friendPending', {
      templateUrl: './views/friendsPending/index.html',
      url: '/user/:id/friendspending/:id',
      controller: 'friendsPendingCtrl'
    })
    .state('passengers', {
      templateUrl: './views/passengers/index.html',
      url: '/festivals/:id/carshare/:id/passengers/:id',
      controller: 'passengersCtrl'
    })
    .state('pendingPassengers', {
      templateUrl: './views/passengerspending/index.html',
      url: '/festivals/:id/carshare/:id/passengerspending/:id',
      controller: 'passengersPendingCtrl'
    })
    .state('attendees', {
      templateUrl: './views/festivals/attendees/index.html',
      url: '/festivals/:id/attendees',
      controller: 'attendeesCtrl'
    });
  $urlRouterProvider.otherwise('/');
}
export default Router;
