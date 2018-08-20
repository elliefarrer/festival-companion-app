function FestivalsIndexCtrl($http, $scope) {
  $http({
    method: 'GET',
    url: '/api/festivals'
  })
    .then(res => {
      console.log('Festivals are', res.data);
      $scope.festivals = res.data;
    });
}

export default FestivalsIndexCtrl;
