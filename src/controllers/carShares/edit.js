function CarSharesEditCtrl($http, $scope, $state) {
  $scope.updateCarShare = function() {
    $http({
      method: 'PUT',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`,
      data: $scope.carShare
    })
      .then(() => $state.go('carSharesShow', { festivalId: $state.params.festivalId, carShareId: $state.params.carShareId }));
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
  })
    .then(res => $scope.carShare = res.data);
}

export default CarSharesEditCtrl;
