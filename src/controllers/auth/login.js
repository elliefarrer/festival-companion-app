function AuthLoginCtrl($auth, $http, $scope, $state, $rootScope) {
  $scope.login = function() {
    $auth.login($scope.user)
      .then(() => {
        $rootScope.loggedInUser = $auth.getPayload().sub;
        $rootScope.loggedInFirstName = $auth.getPayload().firstName;
        $http({
          method: 'GET',
          url: `/api/user/${$auth.getPayload().sub}`
        })
          .then(res => {
            console.log('Found a user', res.data);
            $scope.user = res.data;
            $scope.storeCurrentUser(res.data);
            $state.go('festivalsIndex');
          });
      });
  };
}

export default AuthLoginCtrl;
