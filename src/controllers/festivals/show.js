/* global L */
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
      url: 'https://www.mapquestapi.com/geocoding/v1/address',
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
