function ngSkycon() {
  return {
    restrict: 'E',
    link($scope, $element, attributes) {
      var skycons = new Skycons({'color': 'white'}); /* global Skycons */
      const el = $element[0]; // Get the actual DOM element
      const canvas = el.children[0];
      skycons.add(canvas, attributes.icon);
      skycons.play();
    }
  };
}

export default ngSkycon;
