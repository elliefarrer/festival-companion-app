function UsersShowCtrl($http, $scope, $state) {
  $scope.deleteUser = function() {
    $http({
      method: 'DELETE',
      url: `/api/users/${$state.params.userId}`
    })
      .then(() => $state.go('login'));
  };
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.userId}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });
}

export default UsersShowCtrl;
