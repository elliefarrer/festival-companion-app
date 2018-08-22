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
      $scope.attendance = $scope.festival.attendees.map(attendee =>   attendee._id).includes($scope.loggedInUser);
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
        marker.bindPopup(`<img src=${popupImg} alt=${popupName}  /><p>${popupName},   ${popupAddress}</p>`).openPopup();
      });
  }

  let searchCoordsLat;
  let searchCoordsLng;

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


              //////////// DATES ///////////////
              $scope.dayThreeDate = moment.unix(res.data.daily.data[2].time).format('dddd');
              $scope.dayFourDate = moment.unix(res.data.daily.data[3].time).format('dddd');
              $scope.dayFiveDate = moment.unix(res.data.daily.data[4].time).format('dddd');

              //////////// FUTURE FORECAST DATA ////////////////////
              $scope.tomorrowWeather = res.data.daily.data[1];
              $scope.dayThreeWeather = res.data.daily.data[2];
              $scope.dayFourWeather = res.data.daily.data[3];
              $scope.dayFiveWeather = res.data.daily.data[4];

              ////////////////////// CHANCE OF RAIN ////////////////////////////////
              $scope.todayRain = parseInt((res.data.currently.precipProbability) * 100);
              $scope.tomorrowRain = parseInt((res.data.daily.data[1].precipProbability) * 100);
              $scope.dayThreeRain = parseInt((res.data.daily.data[2].precipProbability) * 100);
              $scope.dayFourRain = parseInt((res.data.daily.data[3].precipProbability) * 100);
              $scope.dayFiveRain = parseInt((res.data.daily.data[4].precipProbability) * 100);

              /////////////// CELSIUS TEMPERATURES //////////////////////
              $scope.todayCelsius = Math.round(((res.data.currently.temperature - 32) * 5) / 9);
              $scope.tomorrowCelsius = Math.round(((res.data.daily.data[1].temperatureHigh - 32) * 5) / 9);
              $scope.dayThreeCelsius = Math.round(((res.data.daily.data[2].temperatureHigh - 32) * 5) / 9);
              $scope.dayFourCelsius = Math.round(((res.data.daily.data[3].temperatureHigh - 32) * 5) / 9);
              $scope.dayFiveCelsius = Math.round(((res.data.daily.data[4].temperatureHigh - 32) * 5) / 9);

              ////////////////// ICONS /////////////////////////////////
              $scope.todayIcon = res.data.daily.data[0].icon;
              $scope.tomorrowIcon = res.data.daily.data[1].icon;
              $scope.dayThreeIcon = res.data.daily.data[2].icon;
              $scope.dayFourIcon = res.data.daily.data[3].icon;
              $scope.dayFiveIcon = res.data.daily.data[4].icon;


              function getIcon() {
                const icons = new Skycons({ 'color': '#36223B' });
                const list = [ 'clear-day', 'clear-night', 'partly-cloudy-day','partly-cloudy-night',   'cloudy', 'rain', 'sleet', 'snow', 'wind', 'fog' ];
                for(let i = list.length; i--; ){
                  icons.set(list[i], list[i]);
                }
                icons.play();
              }

              $scope.$watch('todayIcon', function() {
                if($scope.todayIcon) {
                  $timeout(getIcon, 1);
                }
              });

              $scope.$watch('tomorrowIcon', function() {
                if($scope.tomorrowIcon) {
                  $timeout(getIcon, 1);
                }
              });

              $scope.$watch('dayThreeIcon', function() {
                if($scope.dayThreeIcon) {
                  $timeout(getIcon, 1);
                }
              });

              $scope.$watch('dayFourIcon', function() {
                if($scope.dayFourIcon) {
                  $timeout(getIcon, 1);
                }
              });

              $scope.$watch('dayFiveIcon', function() {
                if($scope.dayFiveIcon) {
                  $timeout(getIcon, 1);
                }
              });
            });
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
