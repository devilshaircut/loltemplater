AngularApp.controller("tablesController", ["$rootScope", "$scope", "httpService", function($rootScope, $scope, httpService) {

  // This object basically serves as the inventory data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.inventory = {};

  // This object basically serves as the piece data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.piece = {};

  $scope.nsStateMachine.dataTable.state = {};

  // This function deletes an item from a table.
  // It takes a table identifier and item ID.
  // It also calls a warning before it executes.
  //
  // TO DO: ABSTRACT THIS INTO A TABLE PLUGIN.
  //
  $scope.deleteComponentAction = function(desiredTable, itemID) {
    var arrayLength = $scope.piece['piece_pricing'][desiredTable].length;
    for (var i = 0; i < arrayLength; i++) {
      if ( $scope.piece['piece_pricing'][desiredTable][i]['id'] === itemID ) {
        $scope.piece['piece_pricing'][desiredTable].splice(i, 1);
        return;
      }
    }
  };

  // These strings specify where the API endpoints for this view reside.
  var apiEndpoint1 = '/sampleResponse.json';
  var apiEndpoint2 = '/sampleResponse2.json';


  // This is the callback function that executes if the HTTP request for $scope.inventory returns successfully.
  var getInventorySuccess = function(payload, status) { $scope.inventory = payload; };
  // This is the callback function that executes if the HTTP request for $scope.inventory returns unsuccessfully.
  var getInventoryFailure = function(payload, status) {};

  // This is the callback function that executes if the HTTP request for $scope.piece returns successfully.
  var getPieceSuccess =     function(payload, status) { $scope.piece = payload; };
  // This is the callback function that executes if the HTTP request for $scope.piece returns unsuccessfully.
  var getPieceFailure =     function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint1).success(getInventorySuccess);
  httpService.getApiEndpoint(apiEndpoint2).success(getPieceSuccess);

}]);









