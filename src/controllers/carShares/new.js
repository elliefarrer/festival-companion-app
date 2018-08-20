function CarSharesNewCtrl($http, $scope, $state) {
  $scope.createCarShare = function() {
    $http({
      method: 'POST',
      api: `/api/festivals/${$state.params.festivalId}/carShares`,
      data: $scope.carShare
    })
      .then(() => $state.go('carShareShow'));
  };
}

export default CarSharesNewCtrl;
