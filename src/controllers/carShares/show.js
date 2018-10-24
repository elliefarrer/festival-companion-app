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
        url: 'https://www.mapquestapi.com/directions/v2/optimizedroute',
        params: {
          key: $scope.API_KEY,
          from: startPoint,
          to: endPoint
        }
      })
        .then(res => {
          console.log('Le res is', res.data);
          $scope.route = res.data.route;
          $scope.distance = Math.round($scope.route.distance);
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

          const startMarkerOptions = {
            icon: L.icon({
              iconUrl: 'https://assets.mapquestapi.com/icon/v2/circle-start-md.png',
              iconAnchor: [17, 20]
            })
          };

          const endMarkerOptions = {
            icon: L.icon({
              iconUrl: 'https://assets.mapquestapi.com/icon/v2/circle-end-md.png',
              iconAnchor: [17, 20]
            })
          };

          const startMarker = L.marker([startLat, startLng], startMarkerOptions).addTo($scope.map);
          const endMarker = L.marker([endLat, endLng], endMarkerOptions).addTo($scope.map);
          startMarker.bindPopup(`<img class="pop-up-image"src=${$scope.carShare.createdBy.image} alt=${$scope.carShare.createdBy.firstName} /> <p><strong class="is-size-4 has-text-white">${$scope.carShare.createdBy.firstName}</strong><br><span class="is-size-6">${$scope.carShare.from.postcode}</span></p>`);
          endMarker.bindPopup(`<img src=${$scope.carShare.festival.photoUrl} alt=${$scope.carShare.festival.name}  /> <p><strong class="is-size-4 has-text-white">${$scope.carShare.festival.name}  </strong><br><span class="is-size-6">${$scope.carShare.festival.location.address}</span></p>`);




          const polyline = L.polyline([[startLat, startLng], [endLat, endLng]]).addTo($scope.map);
          polyline.setStyle({
            color: '#36223B'
          });
        });
    }
  });

}




export default CarSharesShowCtrl;
