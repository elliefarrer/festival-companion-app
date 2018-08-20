function attendeesIndexCtrl($http, $scope, $state) {
  $http({
    method: 'GET',
    url: `/api/festival/${$state.params.id}/attendee`
  })
    .then(res => {
      $scope.attendees = res.data;
    });
}

export default attendeesIndexCtrl;
