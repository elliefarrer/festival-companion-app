/*global L*/

function userMap($http) {
  // const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
  let placeLat;
  let placeLng;
  return {
    restrict: 'A',
    link($scope, $element) {
      const domElement = $element[0];
      console.log('The map element is', domElement);
      console.log('The scope is', $scope);
      // const map = L.mapquest.map(domElement);
      $scope.$watch('curentLocation', function() {
        if($scope.currentLocation) {
          const currentLocation = $scope.user.currentLocation;
          const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
          L.mapquest.key = API_KEY;
          $http({
            method: 'GET',
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${currentLocation}`
          })
            .then(res => {
              placeLat = res.data.results[0].place[0].latLng.lat;
              placeLng = res.data.results[0].place[0].latLng.lng;
              const map = L.mapquest.map('map', {
                center: [placeLat, placeLng],
                layers: L.mapquest.tileLayer('map'),
                zoom: 13
              });
              const marker = L.marker([placeLat, placeLng]).addTo(map);
              marker.bindPopup('<p>You are here</p>').openPopup();
            });
        }
      });
    }
  };
  // const marker = L
}

export default userMap;
