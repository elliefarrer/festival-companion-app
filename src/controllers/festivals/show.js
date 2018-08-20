function FestivalsShowCtrl($http, $scope, $state) {
  $scope.deleteFestival = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}`
    })
      .then(() => $state.go('festivalsIndex'));
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}`
  })
    .then(res => {
      console.log('Found a festival', res.data);
      $scope.festival = res.data;
    });
}

export default FestivalsShowCtrl;
