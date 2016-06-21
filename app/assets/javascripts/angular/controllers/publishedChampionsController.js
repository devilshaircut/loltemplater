AngularApp.controller("publishedChampionsController", ["$rootScope", "$scope", "httpService", "$http", function($rootScope, $scope, httpService, $http) {

  // This object basically serves as the piece data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.champions = [];

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
    // console.log("DELETE");
  };

  var successCallback = function(payload, status) {
    var championsArray = [];
    for (var i=0; i < payload.data.data.ownedChampions.length; i++) {
      payload.data.data.ownedChampions[i].championjson.owned = true;
      payload.data.data.ownedChampions[i].championjson.id = payload.data.data.ownedChampions[i].id;
      championsArray.push(payload.data.data.ownedChampions[i].championjson);
    }
    for (var j=0; j < payload.data.data.unownedChampions.length; j++) {
      payload.data.data.unownedChampions[j].championjson.owned = false;
      payload.data.data.unownedChampions[j].championjson.id = payload.data.data.unownedChampions[j].id;
      championsArray.push(payload.data.data.unownedChampions[j].championjson);
    }
    // console.log("-----");
    // console.log(championsArray);
    // console.log(championsArray.length);
    // console.log("-----");
    $scope.champions = championsArray;
    $rootScope.nsStateMachine.dataTable.state.champions = {
      currentColumn: "timestamp",
      reverseState: true
    }
  };
  var errorCallback = function(payload, status) { console.log("error"); };

  var fbSessionID = null;
  if ($rootScope.fbSession) {
    fbSessionID = $rootScope.fbSession;
  }
  else if (localStorage.getItem("fbSession")) {
    fbSessionID = localStorage.getItem("fbSession")
  }

  var configurationObject = {
    "method":       "POST",
    "url":          "/get_all_champions",
    "data":         {
      "fbSession":  fbSessionID
    }
  };

  $http(configurationObject).then(successCallback, errorCallback);

}]);













