function AuthRegisterCtrl($auth, $scope, $state) {
  $scope.register = function() {
    console.log('register function');
    $auth
      .signup($scope.user)
      .then(() => $auth.login($scope.userData))
      .then(() => {
        console.log('new user created...');
        $state.go('festivalsIndex');
      });
  };
}

export default AuthRegisterCtrl;
