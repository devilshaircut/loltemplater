AngularApp.controller("warningsController", ["$rootScope", "$scope", "httpService", function($rootScope, $scope, httpService) {

  // This object basically serves as the basic data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.model = {};

  // These strings specify where the API endpoints for this view reside.
  var apiEndpoint = '/sampleResponse.json';

  // This is the callback function that executes if the HTTP request for $scope.model returns successfully.
  var getModelSuccess = function(payload, status) { $scope.model = payload; };
  // This is the callback function that executes if the HTTP request for $scope.model returns unsuccessfully.
  var getModelFailure = function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint).success(getModelSuccess);

}]);









