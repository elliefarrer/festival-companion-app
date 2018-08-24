/* global L */
function UsersShowCtrl($http, $scope, $state, $auth) {
  $scope.deleteUser = function() {
    console.log('we are in delete');
    console.log('url =>', `/api/user/${$state.params.id}`);
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
    .then(res => {
      $scope.idCheck = $auth.getPayload().sub;
      $scope.user = res.data;
      $http({
        method: 'GET',
        url: '/api/festivals/'
      })
        .then((res) => $scope.festivals = res.data);

      if($scope.user.userFriends.map(friend => friend._id).includes($scope.idCheck)) {
        $scope.friendStatus = 'friend';
      } else if ($scope.user.pendingFriends.map(friend => friend._id).includes($scope.idCheck)) {
        $scope.friendStatus = 'pending';
      } else {
        $scope.friendStatus = 'nonFriend';
      }
    });


  // console.log('We have arrived in the show controller');
  console.log('state.params.id is', $state.params.id);
  console.log('current user is', $scope.currentUser()._id);
  console.log($scope.currentUser()._id === $state.params.id);

  // $scope.user = $scope.currentUser();

  if($scope.currentUser()._id === $state.params.id) {
    $scope.$watch('map', function() {
      if($scope.map) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            $scope.map.setView([lat, lon], 13);

            const markerOptions = {
              icon: L.icon({
                iconUrl: 'https://assets.mapquestapi.com/icon/v2/circle-md.png',
                iconAnchor: [17, 20]
              })
            };

            const marker = L.marker([lat, lon], markerOptions).addTo($scope.map);
            marker.bindPopup(
              `<div style="width: 100" class="columns mobile">
                <div class="column is-half">
                  <img class="image pop-up-image" src=${$scope.user.image} alt=${$scope.user.firstName}>
                </div>
                <div class="column is-half">
                  <h3 class="title is-3 has-text-white">${$scope.user.firstName}</h3>
                </div>
            </div>`
            )
              .openPopup();
          },
          err => console.log(err),
          { timeout: 10000 });
      }
    });
  }

  $scope.sendFriendRequest = function() {
    $http({
      method: 'POST',
      url: `/api/user/${$scope.currentUser()._id}/friends/${$state.params.id}`
    })
      .then(res => {
        $scope.friendStatus = 'pending';
        $scope.user = res.data;
      });
  };

  $scope.removeFriend = function() {
    $http({
      method: 'DELETE',
      url: `/api/user/${$scope.currentUser()._id}/friends/${$state.params.id}`
    })
      .then(res => {
        $scope.friendStatus = 'nonFriend';
        $scope.user = res.data;
      });
  };
}

export default UsersShowCtrl;
