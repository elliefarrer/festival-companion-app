function FestivalsNewCtrl($http, $scope, $state) {
  $scope.createFestival = function() {
    console.log('Creating a festival', $scope.festival);
    $http({
      method: 'POST',
      url: '/api/festivals',
      data: $scope.festival
    })
      .then(() => $state.go('festivalsIndex'));
  };

  $scope.imageUploaded = false;

  const fp = filestack.init('AexgdNExkS7KW6EtgRtLPz'); /* global filestack */

  $scope.uploadImage = function() {
    fp.pick()
      .then(res => {
        $scope.festival = {};
        $scope.festival.photoUrl = res.filesUploaded[0].url;
        // console.log(fp);
        if ($scope.festival.photoUrl) {
          $scope.imageUploaded = true;
        }
        $scope.$apply();
      })
      .catch(err => console.log(err));
  };

}

export default FestivalsNewCtrl;
