function CarSharesNewCtrl($http, $scope, $state) {

  $scope.createCarShare = function() {

    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.festivalId}/carShares`,
      data: $scope.carShare
    })
<<<<<<< HEAD
      .then(() => $state.go('carSharesShow'({
        festivalId: $state.params.festivalId,
        carSharesId: $state.params.carSharesId
      })));
=======
      .then(() => $state.go('carSharesShow'));
>>>>>>> development
  };

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}`
  })
    .then((res) => {
      console.log('festival is', res.data);
      $scope.festival = res.data;
    });
}

export default CarSharesNewCtrl;
