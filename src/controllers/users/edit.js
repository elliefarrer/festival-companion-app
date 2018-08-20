function UsersEditCtrl($http, $scope, $state) {
  $scope.updateUser = function() {
    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`
    })
      .then(() => $state.go('usersShow', { id: $state.params.id }));
  };
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => $scope.user = res.data);
}

export default UsersEditCtrl;
