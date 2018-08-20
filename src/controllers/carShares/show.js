function CarSharesShowCtrl($http, $scope, $state) {
  $scope.deleteCarShare = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
    })
      .then(() => $state.go('festivalsShow', {festivalId: $state.params.festivalId}));
  };

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
  })
    .then(res => {
      console.log('Car share is', res.data);
      $scope.carShare = res.data;
    });


  $scope.requestRide = function() {
    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/passengers`
    })
      .then(() => $state.go('carShareShow', {
        festivalId: $state.params.festivalId,
        carShareId: $state.params.carShareId
      }));
  };

  $scope.cancelRide = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/passengers`
    })
      .then(() => $state.go('carShareShow', {
        festivalId: $state.params.festivalId,
        carShareId: $state.params.carShareId
      }));
  };

}


export default CarSharesShowCtrl;
