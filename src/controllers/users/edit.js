function UsersEditCtrl($http, $scope, $state) {
  $scope.updateUser = function() {
    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.userId}`
    })
      .then(() => $state.go('usersShow', { id: $state.params.userId }));
  };
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.userId}`
  })
    .then(res => $scope.user = res.data);
}

export default UsersEditCtrl;
