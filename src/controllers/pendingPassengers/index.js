function PendingPassengersIndexCtrl($http, $scope, $state) {

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/pendingPassengers`
  })
    .then(res => $scope.pendingPassengers = res.data);

  $scope.rejectPassengerRequest = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/pendingPassengers/${$state.params.passengerId}`
    });
  };
}

export default PendingPassengersIndexCtrl;
