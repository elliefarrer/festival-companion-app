function CarSharesIndexCtrl($http, $scope, $state) {
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares`
  })
    .then(res => {
      console.log('Car shares are', res.data);
      $scope.carShares = res.data;
    });
}

export default CarSharesIndexCtrl;
