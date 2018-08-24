/* global L */
const moment = require('moment');

function FestivalsShowCtrl($http, $scope, $state, $auth, $timeout) {

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
    $scope.festival.startDate = moment($scope.festival.startDate).format('Do MMMM YYYY');
    $scope.festival.endDate = moment($scope.festival.endDate).format('Do MMMM YYYY');

    $scope.attendance = $scope.festival.attendees.map(attendee =>   attendee._id).includes($scope.loggedInUser);
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

      const markerOptions = {
        icon: L.icon({
          iconUrl: 'https://assets.mapquestapi.com/icon/v2/circle-md.png',
          iconAnchor: [17, 20]
        })
      }

      const marker = L.marker([placeLat, placeLng], markerOptions).addTo($scope.map);
      marker.bindPopup(`<img src=${popupImg} alt=${popupName}  /> <p><strong class="is-size-4 has-text-white">${popupName}  </strong><br><span class="is-size-6">${popupAddress}</span></p>`).openPopup();
    });
  }


  $scope.$watch('festival', function() {
    if($scope.festival) {
      $http({
        method: 'GET',
        url: `https://nominatim.openstreetmap.org/search/${$scope.festival.location.postcode}?format=json`
      })
        .then(res => {
          const searchCoords = res.data.sort((a, b) => a.importance < b.importance)[0];
          console.log('Found them', searchCoords);
          $scope.searchCoords = searchCoords;

          console.log('Y u no work', searchCoords.lat, searchCoords.lon);
          $http({
            method: 'GET',
            url: '/api/weather',
            params: { lat: searchCoords.lat, lon: searchCoords.lon }
          })
            .then(res => {
              console.log('Y u still no work', $scope.searchCoords);
              $scope.weather = res.data;
              console.log('The weather is', $scope.weather);

              const weatherDays = [
                {}, {}, {}, {}, {}
              ];

              //////////// DATES ///////////////
              for (let day = 0; day < 5; day++) {
                const dataOnDay = res.data.daily.data[day];
                weatherDays[day].date = moment.unix(res.data.daily.data[day].time).format('dddd');
                weatherDays[day].weather = dataOnDay;
                weatherDays[day].chanceOfRain = parseInt((dataOnDay.precipProbability) * 100);
                weatherDays[day].uvIndex = dataOnDay.uvIndex;
                weatherDays[day].temperature = Math.round(((dataOnDay.temperatureHigh - 32) * 5) / 9);
                weatherDays[day].icon = dataOnDay.icon;
              }

              $scope.weatherDays = weatherDays;

            });
        });

    }
  });

  $scope.expand = false;
  $scope.toggleExpand = function() {
    console.log('im firing');
    if($scope.expand) {
      $scope.expand = false;
    } else {
      $scope.expand = true;
    }
  };

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
