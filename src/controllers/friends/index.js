function FriendsIndexCtrl($http, $scope, $state) {
  $http({
    method: 'GET',
    url: `/user/${$state.params.id}/friends`
  })
    .then(res =>   {
      console.log('The friends are', res.data);
      $scope.friends = res.data;
    });

  $scope.sendFriendRequest = function() {
    $http({
      method: 'POST',
      url: `/user/${$state.params.userId}/friends/${$state.params.friendId}`
    })
      .then(() => $state.go(`/user/${$state.params.id}`));
  };

  $scope.removeFriend = function() {
    $http({
      method: 'DELETE',
      url: `/user/${$state.params.userId}/friends/${$state.params.friendId}`
    })
      .then(() => $state.go(`/user/${$state.params.id}`));
  };
}



export default FriendsIndexCtrl;
