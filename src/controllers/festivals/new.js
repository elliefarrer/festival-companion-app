function FestivalsNewCtrl($http, $scope, $state) {
  $scope.createFestival = function() {
    console.log('Creating a festival', $scope.festival);
    $http({
      method: 'POST',
      url: '/api/festivals',
      data: $scope.festival
    })
      .then(() => $state.go('festivalsIndex'));
  };
}

export default FestivalsNewCtrl;
