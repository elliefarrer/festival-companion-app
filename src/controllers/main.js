function MainCtrl($auth, $scope, $state, $rootScope, $timeout) {
  // NOTE: isAuthenticated is a FUNCTION
  $scope.isAuthenticated = $auth.isAuthenticated; // Now avaliable in every view & the controller

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => $scope.flashMessage = null, 4000);
  });

  $scope.logout = function() {
    $auth.logout();
    $state.go('home');
  };
}

export default MainCtrl;