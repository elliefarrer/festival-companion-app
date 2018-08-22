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
    .then(res => {
      const splitStartDate = res.data.festival.startDate.slice(9);
      const splitEndDate = res.data.festival.endDate.slice(9);
      console.log('New start date is ', splitStartDate);
      console.log('New end date is ', splitEndDate);
    })
    .then(res => $scope.user = res.data);
}

export default UsersEditCtrl;
