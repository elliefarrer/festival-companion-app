function AuthRegisterCtrl($auth, $scope, $state) {
  $scope.register = function() {
    $auth
      .signup($scope.user)
      .then(() => $auth.login($scope.user))
      .then(() => {
        console.log('new user created...');
        $state.go('festivalsIndex');
      });
  };
}

export default AuthRegisterCtrl;
