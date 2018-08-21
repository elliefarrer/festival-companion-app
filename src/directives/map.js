/*global L*/

function Map($http) {
  // const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
  return {
    restrict: 'A',
    link($scope, $element) {
      const domElement = $element[0];
      console.log('The map element is', domElement);
      console.log('The scope is', $scope);
      // const map = L.mapquest.map(domElement);
      $scope.$watch('festival', function() {
        if($scope.festival) {
          const API_KEY = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';
          L.mapquest.key = API_KEY;
          console.log('Festival scope is', $scope.festival.location);
          $http({
            method: 'GET',
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${$scope.festival.location}`
          })
            .then(res => {
              const place = res.data;
              console.log('res data is', place);
              L.mapquest.map('map', {
                center: [res.data.results[0].locations[0].latLng.lat,     res.data.results[0].locations[0].latLng.lng],
                layers: L.mapquest.tileLayer('map'),
                zoom: 13
              });
            });
        }
      });
    }
  };
  // const marker = L
}

export default Map;
