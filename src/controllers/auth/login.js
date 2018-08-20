function AuthLoginCtrl($auth, $http, $scope, $state) {
  $scope.login = function() {
    $auth.login($scope.user)
      .then(() => $state.go('festivalsIndex'))
      .catch(err => console.log('There was an error', err));
  };
}

export default AuthLoginCtrl;
