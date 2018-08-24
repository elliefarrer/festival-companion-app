function CommentsNewCtrl($http, $scope, $state) {
  $scope.createComment = function() {
    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/comments`,
      data: $scope.carShares.comments
    })
      .then(() => $state.go('carSharesShow'));
  };
}

export default CommentsNewCtrl;
