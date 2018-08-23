function AuthRegisterCtrl($auth, $scope, $state) {

  $scope.register = function() {
    $auth
      .signup($scope.user)
      .then(() => $auth.login($scope.user))
      .then(() => {
        console.log('new user created...');
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
        console.log($scope.user.image);
        // console.log(fp);
        if ($scope.user.image) {
          $scope.imageUploaded = true;
        }
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
