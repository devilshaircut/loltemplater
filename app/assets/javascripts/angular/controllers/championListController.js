AngularApp.controller("championListController", ["$rootScope", "$scope", "httpService", function($rootScope, $scope, httpService) {

  // BEGIN: Data storage and retrieval. --------------------------------------------------------------
  console.log(localStorage);
  var createLocalStorageIfEmpty = function() {
    if (!localStorage.getItem("lolchampions")) {
      var lolchampions = {
        "champions": []
      }
      localStorage.setItem("lolchampions", JSON.stringify(lolchampions));
    }
  };
  createLocalStorageIfEmpty();
  console.log(localStorage);
  // END: Data storage and retrieval. ----------------------------------------------------------------


  // This object basically serves as the inventory data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.inventory = {};

  // This object basically serves as the piece data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.champions = {};

  $scope.nsStateMachine.dataTable.state = {};

  // This function deletes an item from a table.
  // It takes a table identifier and item ID.
  // It also calls a warning before it executes.
  //
  // TO DO: ABSTRACT THIS INTO A TABLE PLUGIN.
  //
  $scope.deleteComponentAction = function(desiredTable, itemID) {
    // var arrayLength = $scope.piece['piece_pricing'][desiredTable].length;
    // for (var i = 0; i < arrayLength; i++) {
    //   if ( $scope.piece['piece_pricing'][desiredTable][i]['id'] === itemID ) {
    //     $scope.piece['piece_pricing'][desiredTable].splice(i, 1);
    //     return;
    //   }
    // }
    $scope.champions.splice(itemID, 1);
    localStorage.setItem("lolchampions", angular.toJson({"champions": $scope.champions}));
    console.log("DELETE");
  };

  // These strings specify where the API endpoints for this view reside.
  var apiEndpoint2 = '/sampleResponse2.json';

  // This is the callback function that executes if the HTTP request for $scope.piece returns successfully.
  var getPieceSuccess =     function(payload, status) {
    $scope.champions = payload;
    $rootScope.nsStateMachine.dataTable.state.champions = {
      currentColumn: "timestamp",
      reverseState: true
    }
  };
  // This is the callback function that executes if the HTTP request for $scope.piece returns unsuccessfully.
  var getPieceFailure =     function(payload, status) {};

  // Initiate the HTTP request.
  // httpService.getApiEndpoint(apiEndpoint2).success(getPieceSuccess);
  getPieceSuccess(JSON.parse(localStorage.getItem("lolchampions")).champions);

}]);













