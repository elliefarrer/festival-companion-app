function UsersIndexCtrl($http, $scope) {
  $http({
    method: 'GET',
    url: '/api/user'
  })
    .then(res => {
      $scope.users = res.data;
    });
}

export default UsersIndexCtrl;
