function MainCtrl($auth, $scope, $state, $rootScope, $timeout) {
  // NOTE: isAuthenticated is a FUNCTION
  $scope.isAuthenticated = $auth.isAuthenticated; // Now avaliable in every view & the controller
  $scope.loggedInUser = $auth.getPayload().sub;

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => $scope.flashMessage = null, 4000);
  });

  $scope.logout = function() {
    $auth.logout().then(() => {
      console.log('LOGGED USER OUT!!!');
    });
    $state.go('festivalIndex');
  };
}

export default MainCtrl;
