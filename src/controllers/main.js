function MainCtrl($auth, $scope, $state, $rootScope, $timeout) {
  // NOTE: isAuthenticated is a FUNCTION
  $scope.isAuthenticated = $auth.isAuthenticated; // Now avaliable in every view & the controller

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => $scope.flashMessage = null, 4000);
  });

  $scope.currentUser = function() {
    return JSON.parse(localStorage.getItem('currentUser'));
  };

  $scope.logout = function() {
    $auth.logout().then(() => {
      console.log('LOGGED USER OUT!!!');
      localStorage.setItem('currentUser', null);
      $rootScope.loggedInUser = null;
      $rootScope.loggedInfirstName = null;
    });
    $state.go('festivalsIndex');
  };
}

export default MainCtrl;
