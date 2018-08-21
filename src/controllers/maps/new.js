function MapsNewCtrl($http, $scope, $state) {
  $scope.createMap = function() {
    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.id}/markers`,
      data: $scope.marker
    })
      .then(() => {
        $state.go('festivalsShow', { id: $state.params.id });
      });

  };
}

export default MapsNewCtrl;
