function attendeesIndexCtrl($http, $scope, $state) {
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.id}/attendees`
  })
    .then(res => {
      $scope.festival = res.data;
    });
}

export default attendeesIndexCtrl;
