function CarSharesNewCtrl($http, $scope, $state) {

  $scope.createCarShare = function() {

    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.festivalId}/carShares`,
      data: $scope.carShare
    })
      .then(res => {
        $state.go('carSharesShow', {
          festivalId: $state.params.festivalId,
          carShareId: res.data._id
        });
      });
  };

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}`
  })
    .then((res) => {
      // console.log('festival is', res.data);
      $scope.festival = res.data;
      // Prepopulate the form with festival data
      $scope.carShare = {};
      $scope.carShare.to = {};
      $scope.carShare.departureDate = res.data.startDate;
      $scope.carShare.returnDate = res.data.endDate;
      $scope.carShare.to.postcode = res.data.location.postcode;

      // TODO: Add festival start date to the ride share form
    });
}

export default CarSharesNewCtrl;
