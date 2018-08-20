function CarSharesShowCtrl($http, $scope, $state) {
  $scope.deleteCarShare = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
    })
      .then(() => $state.go('festivalsShow'));
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
  })
    .then(res => {
      console.log('Car share is', res.data);
      $scope.carShare = res.data;
    });
}

export default CarSharesShowCtrl;
