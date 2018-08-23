const moment = require('moment');

function CarSharesShowCtrl($http, $scope, $state, $auth) {
  $scope.deleteCarShare = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
    })
      .then(() => $state.go('festivalsShow', { id: $state.params.festivalId }));
  };

  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}`
  })
    .then(res => {
      $scope.idCheck = $auth.getPayload().sub;
      $scope.carShare = res.data;

      /////////////////////////////// DATES /////////////////////////////////////////
      $scope.carShare.departureDate = moment($scope.carShare.departureDate).format('DD/MM/YY');
      $scope.carShare.returnDate = moment($scope.carShare.returnDate).format('DD/MM/YY');
      $scope.carShare.festival.startDate = moment($scope.carShare.festival.startDate).format('Do MMMM YYYY');
      $scope.carShare.festival.endDate = moment($scope.carShare.festival.endDate).format('Do MMMM YYYY');

      if($scope.carShare.passengers.map(passenger => passenger._id).includes($scope.idCheck)) {
        $scope.passengerStatus = 'passenger';
      } else if ($scope.carShare.pendingPassengers.map(passenger => passenger._id).includes($scope.idCheck)) {
        $scope.passengerStatus = 'pending';
      } else {
        $scope.passengerStatus = 'nonPassenger';
      }
    });


  $scope.requestRide = function() {
    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/passengers`
    })
      .then(res => {
        console.log(res.data);
        $scope.passengerStatus = 'pending';
      });
  };

  //cancels the logged in user's ride
  $scope.cancelRide = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/passengers/${$scope.idCheck}`
    })
      .then(res => {
        console.log(res.data);
        $scope.passengerStatus = 'nonPassenger';
      });
  };

  $scope.$watch('carShare', function() {
    if($scope.carShare) {
      console.log('Car share knows about the map');
      const startPoint = $scope.carShare.from.postcode;
      const endPoint = $scope.carShare.festival.location.postcode;
      $http({
        method: 'GET',
        url: 'http://www.mapquestapi.com/directions/v2/route',
        params: {
          key: $scope.API_KEY,
          from: startPoint,
          to: endPoint
        }
      })
        .then(res => {
          console.log('Le res is', res.data);
          const startLat = res.data.route.locations[0].latLng.lat;
          const startLng = res.data.route.locations[0].latLng.lng;
          const endLat = res.data.route.locations[1].latLng.lat;
          const endLng = res.data.route.locations[1].latLng.lng;
          $scope.map.setView([startLat, startLng], 8);
          const startMarker = L.marker([startLat, startLng]).addTo($scope.map);
          const endMarker = L.marker([endLat, endLng]).addTo($scope.map);
        });
    }
  });

}




export default CarSharesShowCtrl;
