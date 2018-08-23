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
        url: 'http://www.mapquestapi.com/directions/v2/optimizedroute',
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

          $scope.map.setView([startLat, startLng]);

          const boundingBox = res.data.route.boundingBox;
          $scope.map.fitBounds([
            [boundingBox.lr.lat, boundingBox.lr.lng],
            [boundingBox.ul.lat, boundingBox.ul.lng]
          ]);
          const startMarker = L.marker([startLat, startLng]).addTo($scope.map);
          const endMarker = L.marker([endLat, endLng]).addTo($scope.map);
          startMarker.bindPopup(`<p>Start: ${$scope.carShare.festival.location.postcode}</p>`).openPopup();
          endMarker.bindPopup(`<img src=${$scope.carShare.festival.photoUrl} alt=${$scope.carShare.festival.name}  /><p>${$scope.carShare.festival.name},   ${$scope.carShare.festival.location.address}</p>`).openPopup();


          const pointOneLat = res.data.route.legs[0].maneuvers[0].startPoint.lat;
          const pointOneLng = res.data.route.legs[0].maneuvers[0].startPoint.lng;
          const pointTwoLat = res.data.route.legs[0].maneuvers[1].startPoint.lat;
          const pointTwoLng = res.data.route.legs[0].maneuvers[1].startPoint.lng;
          const pointThreeLat = res.data.route.legs[0].maneuvers[2].startPoint.lat;
          const pointThreeLng = res.data.route.legs[0].maneuvers[2].startPoint.lng;
          const pointFourLat = res.data.route.legs[0].maneuvers[3].startPoint.lat;
          const pointFourLng = res.data.route.legs[0].maneuvers[3].startPoint.lng;
          const pointFiveLat = res.data.route.legs[0].maneuvers[4].startPoint.lat;
          const pointFiveLng = res.data.route.legs[0].maneuvers[4].startPoint.lng;
          const pointSixLat = res.data.route.legs[0].maneuvers[5].startPoint.lat;
          const pointSixLng = res.data.route.legs[0].maneuvers[5].startPoint.lng;
          const pointSevenLat = res.data.route.legs[0].maneuvers[6].startPoint.lat;
          const pointSevenLng = res.data.route.legs[0].maneuvers[6].startPoint.lng;

          L.polyline([[startLat, startLng],[pointOneLat, pointOneLng], [pointTwoLat, pointTwoLng], [pointThreeLat, pointThreeLng], [pointFourLat, pointFourLng], [pointFiveLat, pointFiveLng], [pointSixLat, pointSixLng], [pointSevenLat, pointSevenLng], [endLat, endLng]]).addTo($scope.map);
        });
    }
  });

}




export default CarSharesShowCtrl;
