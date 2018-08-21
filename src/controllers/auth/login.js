function AuthLoginCtrl($auth, $http, $scope, $state, $rootScope) {
  $scope.login = function() {
    $auth.login($scope.user)
      .then(() => {
        $rootScope.loggedInUser = $auth.getPayload().sub;
        $state.go('festivalsIndex');
      })
      .catch(err => console.log('There was an error', err));
  };
}

export default AuthLoginCtrl;
