function FestivalsIndexCtrl($http, $scope) {
  $http({
    method: 'GET',
    url: '/api/festivals'
  })
    .then(res => {
      console.log('Festivals are', res.data);
      $scope.festivals = res.data;
      console.log('Attendees are', res.data.attendees);
    });
}

export default FestivalsIndexCtrl;
