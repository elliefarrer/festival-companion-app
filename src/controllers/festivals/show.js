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
