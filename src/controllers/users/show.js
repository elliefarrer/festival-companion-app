function UsersShowCtrl($http, $scope, $state) {
  $scope.deleteUser = function() {
    $http({
      method: 'DELETE',
      url: `/api/users/${$state.params.userId}`
    })
      .then(() => $state.go('login'));
  };
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.userId}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
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
