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

  $scope.attending = function() {
    $http({
      method: 'POST',
      url: `/api/festival/${$state.params.id}/attendee`
    })
      .then(() => $state.go('carShareShow', {
        festivalId: $state.params.festivalId
      }));
  };

  $scope.notAttending = function() {
    $http({
      method: 'DELETE',
      url: `/api/festival/${$state.params.id}/attendee`
    })
      .then(() => $state.go('carShareShow', {
        festivalId: $state.params.festivalId
      }));
  };
}


export default FestivalsShowCtrl;
