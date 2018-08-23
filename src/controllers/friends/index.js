function FriendsIndexCtrl($http, $scope, $state) {

  $scope.reloadRoute = function() {
    $state.reload();
  };

  $http({
    method: 'GET',
    url: `/api/user/${$state.params.id}/friends`
  })
    .then(res =>   {
      console.log('The friends are', res.data.userFriends);
      $scope.user = res.data;
    });

  $scope.sendFriendRequest = function(friendId) {
    $http({
      method: 'POST',
      url: `/api/user/${$scope.currentUser()._id}/friends/${friendId}`
    })
      .then(res => {
        console.log('user data is', res.data);
        $scope.user = res.data;
      });
  };

  $scope.removeFriend = function(friendId) {
    $http({
      method: 'DELETE',
      url: `/api/user/$${$scope.currentUser()._id}/friends/${friendId}`
    })
      .then(res => {
        console.log('user data is', res.data);
        $scope.user = res.data;
      });
  };

  //////////////////// Pending friend requests //////////////////////

  /////////////// user can only see their own //////////////////

  $http({
    method: 'GET',
    url: `/api/user/${$scope.currentUser()._id}/pendingFriends`

  })
    .then(res => $scope.pendingFriends = res.data);


  $scope.acceptFriendRequest = function(pendingFriendId) {
    $http({
      method: 'POST',
      url: `/api/user/${$scope.currentUser()._id}/pendingFriends/${pendingFriendId}`
    })
      .then(res => console.log('pendingfriend is', res.data));
  };



  $scope.rejectFriendRequest = function(pendingFriendId) {
    $http({
      method: 'DELETE',
      url: `/api/user/${$scope.currentUser()._id}/pendingFriends/${pendingFriendId}`
    })
      .then(res => console.log('pendingFriends is', res.data));
  };
}



export default FriendsIndexCtrl;
