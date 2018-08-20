function CarSharesEditCtrl($http, $scope, $state) {
  $scope.updateCarShare = function() {
    $http({
      method: 'PUT',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
    })
      .then(() => $state.go('festivalsShow', { id: $state.params.carShareId }));
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
  })
    .then(res => $scope.carShare = res.data);
}

export default CarSharesEditCtrl;
