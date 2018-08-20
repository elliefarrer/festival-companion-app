function pendingFriendsIndexCtrl($http, $scope, $state) {

  $http({
    method: 'GET',
    url: `/api/user/${$state.params.id}/pendingFriends`

  })
    .then(res => $scope.pendingPassengers = res.data);

  $scope.rejectFriendRequest = function() {
    $http({
      method: 'DELETE',
      url: `/api/user/${$state.params.id}/pendingFriends/${$state.params.friendId}`
    });
  };
}

export default PendingFriendsIndexCtrl;
