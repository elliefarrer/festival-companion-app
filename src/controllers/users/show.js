/* global L */
function UsersShowCtrl($http, $scope, $state) {
  $scope.deleteUser = function() {
    console.log('we are in delete');
    console.log('url =>', `/api/user/${$state.params.id}`);
    $http({
      method: 'DELETE',
      url: `/api/user/${$state.params.id}`
    })
      .then(() => $scope.logout())
      .then(() => $state.go('login'));
  };

  // GET /users/:id
  console.log('We have arrived in the show controller');
  console.log('state.params.id is', $state.params.id);
  $scope.user = $scope.currentUser();

  $scope.$watch('map', function() {
    if($scope.map) {
      console.log('The controller knows about the map');
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          $scope.map.setView([lat, lon], 13);
          L.marker([lat, lon]).addTo($scope.map);
        },
        err => console.log(err),
        { timeout: 10000 });
    }
  });
}
export default UsersShowCtrl;
