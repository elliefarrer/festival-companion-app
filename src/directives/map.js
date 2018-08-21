/*global L*/
L.mapquest.key = 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks';

function Map() {
  return {
    restrict: 'A',
    link($scope, $element) {
      const domElement = $element[0];
      console.log('The map element is', domElement);
      const map = L.map(domElement);
      L.mapquest.map('map', {
        center: [37.7749, -122.4194],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
      }).addTo(map);
    }
  };
}

export default Map;
