function UsersEditCtrl($http, $scope, $state) {
  $scope.updateUser = function() {
    console.log('this is user data ',$scope.user, 'this is the url', `/api/user/${$state.params.userId}`);
    $http({
      method: 'PUT',
      url: `/api/user/${$state.params.userId}`,
      data: $scope.user
    })
      .then(res => {
        $scope.storeCurrentUser(res.data);
        $state.go('usersShow', { id: res.data._id });
      });
  };


  $http({
    method: 'GET',
    url: `/api/user/${$state.params.userId}`
  })
    .then(res => $scope.user = res.data);
}

export default UsersEditCtrl;
