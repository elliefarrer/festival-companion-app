function AuthRegisterCtrl($auth, $scope, $state) {
  $scope.register = function() {
    $auth
      .signup($scope.user)
      .then(res => {
        console.log('This is the User Data', res.data);
        $auth.login($scope.user);
      })
      .then(() => $state.go('festivalsIndex'));
  };
}

export default AuthRegisterCtrl;
