/* global L */
function UsersShowCtrl($http, $scope, $state) {
  $scope.deleteUser = function() {
    $http({
      method: 'DELETE',
      url: `/api/user/${$state.params.id}`
    })
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
//   $scope.sendFriendRequest = function() {
//     $http({
//       method: 'POST',
//       url: `/user/${$state.params.userId}/friends/${$state.params.friendId}`
//     })
//       .then(() => $state.go(`/user/${$state.params.id}`));
//   };
//
//   $scope.removeFriend = function() {
//     $http({
//       method: 'DELETE',
//       url: `/user/${$state.params.userId}/friends/${$state.params.friendId}`
//     })
//       .then(() => $state.go(`/user/${$state.params.id}`));
//   };
// }
}
export default UsersShowCtrl;
