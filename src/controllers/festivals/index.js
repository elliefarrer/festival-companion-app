const moment = require('moment');

function FestivalsIndexCtrl($http, $scope) {
  $http({
    method: 'GET',
    url: '/api/festivals'
  })
    .then(res => {
      console.log('Festivals are', res.data);
      $scope.festivals = res.data;

      for(let i = 0; i < $scope.festivals.length; i ++) {
        $scope.festivals[i].startDate = moment($scope.festivals[i].startDate).format('Do MMMM YYYY');
        $scope.festivals[i].endDate = moment($scope.festivals[i].endDate).format('Do MMMM YYYY');
      }

      console.log('Attendees are', res.data.attendees);
    });
}

export default FestivalsIndexCtrl;
