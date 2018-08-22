/*global L, MQ*/

function Map($http) {
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
      $scope.$watch('festival', function() {
        if($scope.festival) {
          const searchPostcode = $scope.festival.location.postcode;
          console.log('Search for', searchPostcode);
          const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
          L.mapquest.key = API_KEY;
          $http({
            method: 'GET',
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${searchPostcode}`
          })
          .then(res => {
            placeLat = res.data.results[0].locations[0].latLng.lat;
            placeLng = res.data.results[0].locations[0].latLng.lng;
            const map = L.mapquest.map('map', {
              center: [placeLat, placeLng],
              layers: L.mapquest.tileLayer('map'),
              zoom: 13
            });
            const marker = L.marker([placeLat, placeLng]).addTo(map);
            marker.bindPopup(`<img src=${$scope.festival.photoUrl} alt=${$scope.festival.name} /><p>${$scope.festival.name}, ${$scope.festival.location.address}</p>`).openPopup();
          });
        }
      });
      // marker is currently on a POST request so won't be on $scope at this time
      $scope.$watch('createMap', function() {
        if($scope.createMap) {
          const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
          L.mapquest.key = API_KEY;
          $http({
            method: 'GET',
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=E32AX`
          })
        .then(res => {
          placeLat = res.data.results[0].locations[0].latLng.lat;
          placeLng = res.data.results[0].locations[0].latLng.lng;
          const map = L.mapquest.map('map', {
            center: [placeLat, placeLng],
            layers: L.mapquest.tileLayer('map'),
            zoom: 17
          });
        });
        }
      });
      // const marker = L
    }
  };
}
export default Map;
