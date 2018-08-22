function CarSharesShowCtrl($http, $scope, $state, $auth) {
  $scope.deleteCarShare = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
    })
      .then(() => $state.go('festivalsShow', { id: $state.params.festivalId }));
  };

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
  })
    .then(res => {
      $scope.idCheck = $auth.getPayload().sub;
      $scope.carShare = res.data;

      if($scope.carShare.passengers.map(passenger => passenger._id).includes($scope.idCheck)) {
        $scope.passengerStatus = 'passenger';
      } else if ($scope.carShare.pendingPassengers.map(passenger => passenger._id).includes($scope.idCheck)) {
        $scope.passengerStatus = 'pending';
      } else {
        $scope.passengerStatus = 'nonPassenger';
      }
    });


  $scope.requestRide = function() {
    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/passengers`
    })
      .then(res => {
        console.log(res.data);
        $scope.passengerStatus = 'pending';
      });
  };

  //cancels the logged in user's ride
  $scope.cancelRide = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/passengers/${$scope.idCheck}`
    })
      .then(res => {
        console.log(res.data);
        $scope.passengerStatus = 'nonPassenger';
      });
  };

}


export default CarSharesShowCtrl;
