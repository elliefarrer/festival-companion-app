function UsersEditCtrl($http, $scope, $state) {
  $scope.updateUser = function() {
    // console.log('this is user data ',$scope.user, 'this is the url', `/api/user/${$state.params.userId}`);
    $http({
      method: 'PUT',
      url: `/api/user/${$state.params.userId}`,
      data: $scope.user
    })
      .then(res => {
        $scope.storeCurrentUser(res.data);
        $state.go('usersShow', { id: res.data._id });
      });
  };

  $scope.imageUploaded = false;

  const fp = filestack.init('AexgdNExkS7KW6EtgRtLPz'); /* global filestack */

  $scope.uploadImage = function() {
    fp.pick({
      accept: 'image/jpeg',
      transformations: {
        crop: {
          aspectRatio: 1,
          force: true
        }
      }
    })
      .then(res => {
        // console.log('files are', res.filesUploaded[0].url);
        $scope.user.image = res.filesUploaded[0].url;
        // console.log('User is now', $scope.user);
        // console.log(fp);
        if ($scope.user.image) {
          $scope.imageUploaded = true;
        }
        $scope.$apply();
      })
      .catch(err => console.log(err));
  };


  $http({
    method: 'GET',
    url: `/api/user/${$state.params.userId}`
  })
    .then(res => $scope.user = res.data);
}

export default UsersEditCtrl;
