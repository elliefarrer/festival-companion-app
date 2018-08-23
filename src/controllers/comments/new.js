function CommentsNewCtrl($http, $scope, $state) {
  $scope.createComment = function() {
    console.log('Creating a comment', $scope.comment);
    $http({
      method: 'POST',
      url: `/api/festivals/${$state.params.festivalId}/carShares/${$state.params.carShareId}/comments`,
      data: $scope.comment
    })
      .then(() => $state.go('carSharesShow'));
  };
}

export default CommentsNewCtrl;
