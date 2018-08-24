function FestivalsEditCtrl($http, $scope, $state) {
  $scope.updateFestival = function() {
    $http({
      method: 'PUT',
      url: `/api/festivals/${$state.params.id}`,
      data: $scope.festival
    })
      .then(res => {
        console.log('Updating festival', res.data);
        $state.go('festivalsShow', { id: $state.params.id });
      });
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.id}`
  })
    .then(res => $scope.festival = res.data);

  $scope.imageUploaded = false;

  const fp = filestack.init('AexgdNExkS7KW6EtgRtLPz'); /* global filestack */

  $scope.uploadImage = function() {
    fp.pick()
      .then(res => {
        // console.log('files are', res.filesUploaded[0].url);
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



export default FestivalsEditCtrl;
