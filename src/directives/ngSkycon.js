function ngSkycon() {
  return {
    restrict: 'E',
    link($scope, $element, attributes) {
      var skycons = new Skycons({'color': 'white'}); /* global Skycons */
      const el = $element[0]; // Get the actual DOM element
      const canvas = el.children[0];
      console.log('element and icon', canvas, attributes.icon);
      skycons.add(canvas, attributes.icon);
      skycons.play();
    }
  };
}

export default ngSkycon;
