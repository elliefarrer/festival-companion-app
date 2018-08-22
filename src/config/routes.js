function Router($stateProvider, $urlRouterProvider) {

  // function secureState($auth, $q, $state, $rootScope) {
  //   return new $q(resolve => {
  //     if($auth.isAuthenticated()) return resolve();
  //     // User not logged in
  //     // Create a flash message
  //     $rootScope.$broadcast('flashMessage',{ //Doesn't have to be called flash message, just has to be same as $on
  //       type: 'warning',
  //       content: 'Please log in to continue'
  //     });
  //     $state.go('login');
  //   });
  // }
  $stateProvider
    // .state('about', {
    //   templateUrl: './views/about.html',
    //   url: '/about'
    // })
    // .state('home', {
    //   templateUrl: './views/home.html',
    //   url: '/'
    // })
    .state('festivalsIndex', {
      templateUrl: './views/festivals/index.html',
      url: '/festivals',
      controller: 'FestivalsIndexCtrl'
      // resolve: {
      //   secureState, //result block!
      //   festivals: function($http) {
      //     return $http({
      //       method: 'GET',
      //       url: '/api/festivals'
      //     })
      //       .then(res => res.data);
      //   }
      // }
    })
    .state('festivalsShow', {
      templateUrl: './views/festivals/show.html',
      url: '/festivals/:id', // id is now a parameter of the state
      controller: 'FestivalsShowCtrl'
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
      url: '/',
      controller: 'AuthLoginCtrl'
    })
    .state('register', {
      templateUrl: './views/auth/register.html',
      url: '/register',
      controller: 'AuthRegisterCtrl'
    })
    .state('carSharesIndex', {
      templateUrl: './views/carShares/index.html',
      url: '/festivals/:festivalId/carShares',
      controller: 'CarSharesIndexCtrl'
    })
    .state('carSharesNew', {
      templateUrl: './views/carShares/new.html',
      url: '/festivals/:festivalId/carShares/new',
      controller: 'CarSharesNewCtrl'
    })
    .state('carSharesShow', {
      templateUrl: './views/carShares/show.html',
      url: '/festivals/:festivalId/carShares/:carShareId',
      controller: 'CarSharesShowCtrl'
    })
    .state('carSharesEdit', {
      templateUrl: './views/carShares/edit.html',
      url: '/festivals/:festivalId/carShares/:carShareId',
      controller: 'CarSharesEditCtrl'
    })
    .state('friend', {
      templateUrl: './views/friends/index.html',
      url: '/user/:userId/friends/:friendId',
      controller: 'FriendsIndexCtrl'
    })
    .state('friendPending', {
      templateUrl: './views/friendsPending/index.html',
      url: '/user/:userId/friendspending/:pendingFriendId',
      controller: 'FriendsPendingCtrl'
    })
    .state('passengersIndex', {
      templateUrl: './views/passengers/index.html',
      url: '/festivals/:festivalId/carShares/:carShareId/passengers',
      controller: 'PassengersIndexCtrl'
    })
    .state('attendeesIndex', {
      templateUrl: './views/attendees/index.html',
      url: '/festivals/:id/attendees',
      controller: 'AttendeesIndexCtrl'
    })

    .state('searchIndex', {
      templateUrl: './views/search/index.html',
      url: '/search',
      controller: 'SearchCtrl'
    })

    .state('usersShow', {
      templateUrl: './views/users/show.html',
      url: '/usersShow/:id',
      controller: 'UsersShowCtrl'
    })

    .state('usersEdit', {
      templateUrl: './views/user/edit.html',
      url: '/users/:userId/edit',
      controller: 'UsersEditCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
