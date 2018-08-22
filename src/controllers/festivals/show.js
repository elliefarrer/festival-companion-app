/* global L */
const moment = require('moment');

function FestivalsShowCtrl($http, $scope, $state, $auth) {

  $scope.loggedInUser = $auth.getPayload().sub;

  $scope.deleteFestival = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.id}`
    })
    .then(res => {
      console.log('Deleted festival', res.data);
      $state.go('festivalsIndex');
    });
  };
  $http({
    method: 'GET',
    url: `/api/festivals/${$state.params.id}`
  })
  .then(res => {
    console.log('Found a festival', res.data);
    $scope.festival = res.data;
    $scope.attendance = $scope.festival.attendees.map(attendee => attendee._id).includes($scope.loggedInUser);
    festivalMap(res.data);
  });

  function festivalMap(festival) {
    const postcode = festival.location.postcode;
    console.log('Search for', postcode);
    $http({
      method: 'GET',
      url: 'http://www.mapquestapi.com/geocoding/v1/address',
      params: {
        key: $scope.API_KEY,
        location: postcode
      }
    })
    .then(res => {
      const placeLat = res.data.results[0].locations[0].latLng.lat;
      const placeLng = res.data.results[0].locations[0].latLng.lng;
      $scope.map.setView([placeLat, placeLng], 13);
      const popupImg = $scope.festival.photoUrl;
      const popupName = $scope.festival.name;
      const popupAddress = $scope.festival.location.address;
      const marker = L.marker([placeLat, placeLng]).addTo($scope.map);
      marker.bindPopup(`<img src=${popupImg} alt=${popupName}  /><p>${popupName}, ${popupAddress}</p>`).openPopup();
    });
  }

  let searchCoords;

  $scope.$watch('festival', function() {
    if($scope.festival) {
      $http({
        method: 'GET',
        url: `https://nominatim.openstreetmap.org/search/${$scope.festival.location.postcode}?format=json`
      })
      .then(res => {
        searchCoords = res.data.sort((a, b) => a.importance < b.importance)[0];
        console.log('Found them', searchCoords);
        $scope.searchCoords = searchCoords;
      });

      $http({
        method: 'GET',
        url: 'https://api.darksky.net/forecast/',
        params: { lat: $scope.searchCoords.lat, lng: $scope.searchCoords.lng }
      })
      .then(res => {
        console.log('The weather is', res.data);
      });
    }
  });

  $scope.attending = function() {
    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.id}/attendees`
    })
    .then(res=> {
      // console.log(res.data);
      $scope.attendance = res.data.festivalsAttending.toString().includes($scope.festival._id);
      // console.log('this is the attendance', $scope.attendance);
    });
  };

  $scope.notAttending = function() {
    $http({
      method: 'DELETE',
      url: `/api/festivals/${$state.params.id}/attendees`
    })
    .then(res => {
      // console.log(res.data);
      $scope.attendance = res.data.festivalsAttending.toString().includes($scope.festival._id);
      // console.log('this is the attendance', $scope.attendance);
    });

  };

}


export default FestivalsShowCtrl;
