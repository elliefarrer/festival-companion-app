function AuthRegisterCtrl($auth, $scope, $state) {

  $scope.register = function() {
    console.log('Saving user', $scope.user);
    $auth
      .signup($scope.user)
      .then(() => $auth.login($scope.user))
      .then(() => {
        $state.go('festivalsIndex');
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
        $scope.user = {};
        $scope.user.image = res.filesUploaded[0].url;
        console.log('User is now', $scope.user);
        // console.log(fp);
        if ($scope.user.image) {
          $scope.imageUploaded = true;
        }
        $scope.$apply();
      })
      .catch(err => console.log(err));
  };

}
//   client.pick({
//     accept: 'image/jpeg',
//  transformations: {
//    crop: {
//      aspectRatio: 1,
//     force: true
//     }
//     }
// })
//   .then(function(data) {
//     document.getElementById('profilePicture').value = data.filesUploaded[0].url;
//   })
// });
// </script>

export default AuthRegisterCtrl;
