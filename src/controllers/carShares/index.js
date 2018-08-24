const moment = require('moment');

function CarSharesIndexCtrl($http, $scope, $state) {
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares`
  })
    .then(res => {
      console.log('Car shares are', res.data);
      $scope.carShares = res.data;
    });

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}`
  })
    .then(res => {
      console.log('Festival is', res.data);
      $scope.festival = res.data;
      $scope.festival.startDate = moment($scope.festival.startDate).format('Do MMMM YYYY');
      $scope.festival.endDate = moment($scope.festival.endDate).format('Do MMMM YYYY');
    });
}

export default CarSharesIndexCtrl;
