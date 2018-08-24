const moment = require('moment');

function FestivalsIndexCtrl($http, $scope) {
  $http({
    method: 'GET',
    url: '/api/festivals'
  })
    .then(res => {
      $scope.festivals = res.data;

      for(let i = 0; i < $scope.festivals.length; i ++) {
        $scope.festivals[i].startDate = moment($scope.festivals[i].startDate).format('Do MMMM YYYY');
        $scope.festivals[i].endDate = moment($scope.festivals[i].endDate).format('Do MMMM YYYY');
      }

    });
}

export default FestivalsIndexCtrl;
