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
  $http({
    method: 'GET',
    url: `/api/user/${$state.params.id}`
  })
    .then((res) => $scope.user = res.data);

  // console.log('We have arrived in the show controller');
  console.log('state.params.id is', $state.params.id);
  console.log('current user is', $scope.currentUser()._id);
  console.log($scope.currentUser()._id === $state.params.id);

  // $scope.user = $scope.currentUser();

  if($scope.currentUser()._id === $state.params.id) {
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
