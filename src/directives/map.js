/*global L*/

function Map($http) {
  // const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
  let placeLat;
  let placeLng;
  let searchMap;
  let popupImg;
  let popupName;
  let popupAddress;
  let marker = L.popup(),
    geocode,
    map;
  return {
    restrict: 'A',
    link($scope, $element) {
      const domElement = $element[0];
      console.log('The map element is', domElement);
      console.log('The scope is', $scope);
      // const map = L.mapquest.map(domElement);


      $scope.$watch('festival', function() {
        if($scope.festival) {
          searchMap = $scope.festival.location.postcode;
          console.log('Search for', searchMap);
          const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
          L.mapquest.key = API_KEY;
          $http({
            method: 'GET',
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${searchMap}`
          })
            .then(res => {
              placeLat = res.data.results[0].locations[0].latLng.lat;
              placeLng = res.data.results[0].locations[0].latLng.lng;
              const map = L.mapquest.map('map', {
                center: [placeLat, placeLng],
                layers: L.mapquest.tileLayer('map'),
                zoom: 13})
                $scope.$on('click', function(e) {
                  marker.setLatLng(e.latLng).openOn(this);
                });
              popupImg = $scope.festival.photoUrl;
              popupName = $scope.festival.name;
              popupAddress = $scope.festival.location.address;
              const marker = L.marker([placeLat, placeLng]).addTo(map);
              marker.bindPopup(`<img src=${popupImg} alt=${popupName}  /><p>${popupName}, ${popupAddress}</p>`).openPopup();
            });
        }
      });


      $scope.$watch('createMap', function() {
        if($scope.createMap) {
          const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
          L.mapquest.key = API_KEY;
          console.log('Create map search map is', searchMap);
          $http({
            method: 'GET',
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${searchMap}`
          })
            .then(res => {
              placeLat = res.data.results[0].locations[0].latLng.lat;
              placeLng = res.data.results[0].locations[0].latLng.lng;
              const map = L.mapquest.map('map', {
                center: [placeLat, placeLng],
                layers: L.mapquest.tileLayer('map'),
                zoom: 16
              });
              const marker = L.marker([placeLat, placeLng]).addTo(map);
              marker.bindPopup(`<img src=${popupImg} alt=${popupName}  /><p>${popupName}, ${popupAddress}</p>`).openPopup();


            });
        }
      });
      // const marker = L
    }
  };
}
export default Map;
