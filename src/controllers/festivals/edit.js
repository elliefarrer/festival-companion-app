function FestivalsEditCtrl($http, $scope, $state) {
  $scope.updateFestival = function() {
    $http({
      method: 'PUT',
      url: `/api/festivals/${$state.params.festivalId}`
    })
      .then(() => $state.go('festivalsShow', { id: $state.params.festivalId }));
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}`
  })
    .then(res => $scope.festival = res.data);
}

export default FestivalsEditCtrl;
