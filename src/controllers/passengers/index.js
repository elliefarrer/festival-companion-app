function PassengersIndexCtrl($http, $scope, $state, $auth) {

  $scope.idCheck = $auth.getPayload().sub;

  $scope.reloadRoute = function() {
    $state.reload();
  };

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/passengers`
  })
    .then(res => {
      $scope.carShare = res.data;
    });


  // use this on the index to remove other passengers if you are the organiser - need to pass the id as an argument? test.

  $scope.removePassenger = function(passengerId) {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/passengers/${passengerId}`
    })
      .then(res => {
        console.log(res.data);
        console.log(passengerId);
      });
  };



  ///pending passenger requests - these are also for the passenger index

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/pendingPassengers`
  })
    .then(res => $scope.pendingPassengers = res.data);

  $scope.acceptPassengerRequest = function(pendingPassengerId) {
    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/pendingPassengers/${pendingPassengerId}`
    });
  };

  $scope.rejectPassengerRequest = function(pendingPassengerId) {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/pendingPassengers/${pendingPassengerId}`
    });
  };

}
export default PassengersIndexCtrl;
