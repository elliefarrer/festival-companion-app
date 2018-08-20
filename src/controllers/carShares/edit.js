function CarSharesEditCtrl($http, $scope, $state) {
  $scope.updateCarShare = function() {
    $http({
      method: 'PUT',
      url: `/api/festivals/${$state.params.festivals.id}/carShares/${$state.params.carShares.id}`
    })
      .then(() => $state.go('festivalsShow', { id: $state.params.carShares.id }));
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivals.id}/carShares/${$state.params.carShares.id}`
  })
    .then(res => $scope.carShare = res.data);
}

export default CarSharesEditCtrl;
