function FestivalsEditCtrl($http, $scope, $state) {
  $scope.updateFestival = function() {
    $http({
      method: 'PUT',
      url: `/api/festivals/${$state.params.id}`
    })
      .then(() => $state.go('festivalsShow', { id: $state.params.id }));
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.id}`
  })
    .then(res => $scope.festival = res.data);
}

export default FestivalsEditCtrl;
