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

  $scope.uploadImage = function() {
    filepicker.pick({
      mimetype: 'image/*',
      container: 'modal',
      services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM']
    },
    function(result){
      $scope.user.image = result.url.substring(result.url.lastIndexOf('/') + 1);
    },
    function(FPError){

    }
    );
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
