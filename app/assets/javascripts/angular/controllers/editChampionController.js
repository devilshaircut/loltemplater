AngularApp.controller("editChampionController", ["$rootScope", "$scope", "httpService", "$http", function($rootScope, $scope, httpService, $http) {

  // BEGIN: Data storage and retrieval. --------------------------------------------------------------
  // console.log(localStorage);
  var createLocalStorageIfEmpty = function() {
    if (!localStorage.getItem("lolchampions")) {
      var lolchampions = {
        "champions": []
      }
      localStorage.setItem("lolchampions", JSON.stringify(lolchampions));
    }
  };
  createLocalStorageIfEmpty();
  // console.log(localStorage);
  // END: Data storage and retrieval. ----------------------------------------------------------------






  


  $scope.printChampionTemplate = function() {
    console.log($scope.championForm);
    console.log($rootScope.fbSession);
  };








  $scope.saveChampion = function() {
    createLocalStorageIfEmpty();
    var lolchampions = JSON.parse(localStorage.getItem("lolchampions"));
    $scope.championForm.timestamp = Date.now();
    lolchampions.champions.push($scope.championForm);
    localStorage.setItem("lolchampions", angular.toJson(lolchampions));
  };

  // This object basically serves as the basic data model.
  // It is set when the main page AJAX request completes successfully.
  $scope.model = {};



  $scope.interpolateScaling = function(firstValue, lastValue, numberOfValues, parentIndex, childIndex) {
    if ((firstValue && lastValue) || (firstValue > -1 && lastValue > -1)) {
      var increment = (lastValue - firstValue) / (numberOfValues - 1);
      for (var i = 2; i <= (numberOfValues - 1); i++) {
        var specificValue = firstValue + (increment * (i - 1));
        var roundedValue = Math.round((specificValue + 0.00001) * 100) / 100;
        $scope.championForm.skills[parentIndex].scalings[childIndex]["level_" + i] = roundedValue;
      }
    }
    else {
      $rootScope.nsStateMachine.notifications.methods.createNotification("notificationID", "warning", "To interpolate, you must provide valid values for first and last levels.");
    }
  };

  $scope.roundScaling = function(numberOfValues, parentIndex, childIndex) {
    for (var i = 1; i <= numberOfValues; i++) {
      if ($scope.championForm.skills[parentIndex].scalings[childIndex]["level_" + i]) {
        $scope.championForm.skills[parentIndex].scalings[childIndex]["level_" + i] = Math.round($scope.championForm.skills[parentIndex].scalings[childIndex]["level_" + i]);
      }
    }
  };

  $scope.homogenizeScaling = function(numberOfValues, parentIndex, childIndex) {
    if ($scope.championForm.skills[parentIndex].scalings[childIndex]["level_1"]) {
      for (var i = 1; i <= numberOfValues; i++) {
        $scope.championForm.skills[parentIndex].scalings[childIndex]["level_" + i] = $scope.championForm.skills[parentIndex].scalings[childIndex]["level_1"];
      }
    }
    else {
      $rootScope.nsStateMachine.notifications.methods.createNotification("notificationID", "warning", "To set all stat levels equal to level 1, provide a level 1 stat value.");
    }
  };

  $scope.interpolateAbility = function(firstValue, lastValue, numberOfValues, index, locationToInterpolate) {
    if ((firstValue && lastValue) || (firstValue > -1 && lastValue > -1)) {
      var increment = (lastValue - firstValue) / (numberOfValues - 1);
      for (var i = 2; i <= (numberOfValues - 1); i++) {
        var specificValue = firstValue + (increment * (i - 1));
        var roundedValue = Math.round((specificValue + 0.00001) * 100) / 100;
        $scope.championForm.skills[index][locationToInterpolate]["level_" + i] = roundedValue;
      }
    }
    else {
      $rootScope.nsStateMachine.notifications.methods.createNotification("notificationID", "warning", "To interpolate, you must provide valid values for first and last levels.");
    }
  };

  $scope.roundAbility = function(numberOfValues, index, locationToRound) {
    for (var i = 1; i <= numberOfValues; i++) {
      if ($scope.championForm.skills[index][locationToRound]["level_" + i]) {
        $scope.championForm.skills[index][locationToRound]["level_" + i] = Math.round($scope.championForm.skills[index][locationToRound]["level_" + i]);
      }
    }
  };

  $scope.homogenizeAbility = function(numberOfValues, index, locationToHomogenize) {
    if ($scope.championForm.skills[index][locationToHomogenize]["level_1"]) {
      for (var i = 1; i <= numberOfValues; i++) {
        $scope.championForm.skills[index][locationToHomogenize]["level_" + i] = $scope.championForm.skills[index][locationToHomogenize]["level_1"];
      }
    }
    else {
      $rootScope.nsStateMachine.notifications.methods.createNotification("notificationID", "warning", "To set all stat levels equal to level 1, provide a level 1 stat value.");
    }
  };

  $scope.interpolateStats = function(firstValue, lastValue, numberOfValues, locationToInterpolate) {
    if ((firstValue && lastValue) || (firstValue > -1 && lastValue > -1)) {
      var increment = (lastValue - firstValue) / (numberOfValues - 1);
      for (var i = 2; i <= 17; i++) {
        var specificValue = firstValue + (increment * (i - 1));
        var roundedValue = Math.round((specificValue + 0.00001) * 100) / 100;
        $scope.championForm.stats[locationToInterpolate]["level_" + i] = roundedValue;
      }
    }
    else {
      $rootScope.nsStateMachine.notifications.methods.createNotification("notificationID", "warning", "To interpolate, you must provide valid values for first and last levels.");
    }
  };

  $scope.roundStats = function(locationToRound) {
    for (var i = 1; i <= 18; i++) {
      if ($scope.championForm.stats[locationToRound]["level_" + i]) {
        $scope.championForm.stats[locationToRound]["level_" + i] = Math.round($scope.championForm.stats[locationToRound]["level_" + i]);
      }
    }
  };

  $scope.homogenizeStats = function(locationToHomogenize) {
    if ($scope.championForm.stats[locationToHomogenize]["level_1"]) {
      for (var i = 2; i <= 18; i++) {
        $scope.championForm.stats[locationToHomogenize]["level_" + i] = Math.round($scope.championForm.stats[locationToHomogenize]["level_1"]);
      }
    }
    else {
      $rootScope.nsStateMachine.notifications.methods.createNotification("notificationID", "warning", "To set all stat levels equal to level 1, provide a level 1 stat value.");
    }
  };

  $scope.addAnotherQuote = function(quoteType) {
    // console.log($scope.championForm);
    $scope.championForm.quotes[quoteType].push({"string": null});
  }
  $scope.clearThisQuote = function(quoteType, index) {
    // console.log($scope.championForm.quotes[quoteType].length);
    if ($scope.championForm.quotes[quoteType].length > 1) {
      $scope.championForm.quotes[quoteType].splice(index, 1);
    }
    else {
      $scope.championForm.quotes[quoteType] = [{"string": null}];
    }
  }

  $scope.addAnotherSkill = function(index) {
    if (index === undefined) {
      $scope.championForm.skills.push(returnSkillTemplate());
      $scope.championForm.skills[0].scalings.push(returnSkillScalingTemplate());
    }
    else {
      $scope.championForm.skills.push(returnSkillTemplate());
      $scope.championForm.skills[index + 1].scalings.push(returnSkillScalingTemplate());
    }
  };

  $scope.clearThisSkill = function(index) {
    if ($scope.championForm.skills.length > 1) {
      $scope.championForm.skills.splice(index, 1);
    }
    else {
      $scope.championForm.skills = [returnSkillTemplate()];
      $scope.championForm.skills[0].scalings.push(returnSkillScalingTemplate());
    }
  };  

  $scope.addAnotherScaling = function(parentIndex) {
    $scope.championForm.skills[parentIndex].scalings.push(returnSkillScalingTemplate());
  };

  $scope.clearThisScaling = function(parentIndex, index) {
    if ($scope.championForm.skills[parentIndex].scalings.length > 1) {
      $scope.championForm.skills[parentIndex].scalings.splice(index, 1);
    }
    else {
      $scope.championForm.skills[0].scalings = [returnSkillScalingTemplate()]
    }
  };

  var returnSkillScalingTemplate = function() {
    var skillScalingTemplate = {
      "label":         null,
      "label_string":  null,
      "ratio":         null,
      "stat":          null,
      "stat_string":   null,
      "level_1":       null,
      "level_2":       null,
      "level_3":       null,
      "level_4":       null,
      "level_5":       null
    };
    return skillScalingTemplate;
  };

  var returnSkillTemplate = function() {
    var skillTemplate = {
      "name":    null,
      "type":    null,
      "levels":  '5',
      "range": {
        "level_1":   null,      "level_2":   null,      "level_3":   null,
        "level_4":   null,      "level_5":   null,      "level_6":   null
      },
      "cost": {
        "type":            null,
        "type_string":     null,
        "level_1":   null,      "level_2":   null,      "level_3":   null,
        "level_4":   null,      "level_5":   null,      "level_6":   null
      },
      "cooldown": {
        "level_1":   null,      "level_2":   null,      "level_3":   null,
        "level_4":   null,      "level_5":   null,      "level_6":   null
      },
      "thumbnail":   null,
      "description": null,
      "scalings":    []
    };
    return skillTemplate;
  };

  var returnChampionTemplate = function() {
    var championTemplate = {
      "author":            null,
      "key":               null,
      "timestamp":         null,
      "introduction": {
        "name":            null,
        "title":           null,
        "portrait":        null,
        "splash":          null,
        "primary_role":    null,
        "secondary_role":  null,
        "rp_cost":         null,
        "ip_cost":         null,
        "attack":          null, 
        "defense":         null, 
        "ability":         null, 
        "difficulty":      null
      },
      "stats": {
        "health": {
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "health_regen":    {
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "resource":        {
          "name":         null,
          "name_string":  null,
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "resource_regen":  {
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "range":           {
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "attack_damage":   {
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "attack_speed":    {
          "base":      null,
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "armor":           {
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "magic_resist":    {
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        },
        "movement_speed":  {
          "level_1":   null,      "level_2":   null,      "level_3":   null,
          "level_4":   null,      "level_5":   null,      "level_6":   null,
          "level_7":   null,      "level_8":   null,      "level_9":   null,
          "level_10":  null,      "level_11":  null,      "level_12":  null,
          "level_13":  null,      "level_14":  null,      "level_15":  null,
          "level_16":  null,      "level_17":  null,      "level_18":  null
        }
      },
      "skills": [],
      "profile": {
        "biography":       null,
        "lore":            null,
        "strategy":        null
      },
      "quotes": {
        "upon_selection":  null,
        "attacking":       [{"string": null}],
        "movement":        [{"string": null}],
        "taunt":           [{"string": null}],
        "joke":            [{"string": null}],
      }
    };
    return championTemplate;
  };



  $scope.startOverWithBlankChampionTemplate = function() {
    $scope.championForm = returnChampionTemplate();
    $scope.addAnotherSkill();
  };


  // Determine if we load from a blank form or a prepopulated form.
  if (
    (window.location.pathname.indexOf("edit_champion") > 0 || window.location.pathname.indexOf("view_champion") > 0) &&
    parseInt(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)) > -1 &&
    parseInt(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)) <= JSON.parse(localStorage.getItem("lolchampions")).champions.length - 1
  ) {
    var championId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    $scope.championForm = JSON.parse(localStorage.getItem("lolchampions")).champions[championId];
  }
  else {
    // Build the form and add the repeating elements.
    $scope.startOverWithBlankChampionTemplate();
  }



  $scope.uploadImage = function(fileDomLocation, whichImage, index) {

    var splashImage = document.getElementById(fileDomLocation).files[0];

    var successCallback = function(payload, status) {
      var response = payload.data.data;
      var uploadLocation = response.link;
      if (whichImage === "championPortrait") {
        $scope.championForm.introduction.portrait = uploadLocation;
      }
      else if (whichImage === "championSplash") {
        $scope.championForm.introduction.splash = uploadLocation;
      }
      else if (whichImage === "skillIcon") {
        $scope.championForm.skills[index].thumbnail = uploadLocation;
      }
    };
    var errorCallback = function(payload, status) { console.log("error"); };

    var reader = new FileReader();

    reader.onload = function(readerEvent) {
      var data = btoa(readerEvent.target.result);
      var configurationObject = {
        "method": "POST",
        "url": "https://api.imgur.com/3/upload",
        "data": {
          "image": data
        }
      };
      // console.log(configurationObject);
      $http(configurationObject).then(successCallback, errorCallback);
    };
    reader.readAsBinaryString(splashImage);

  };

  $scope.publishChampion = function() {

    var successCallback = function(payload, status) {
      // $scope.championForm.key = payload.data.data.championKey;
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
      "url":          "/save_champion",
      "data":         {
        "champion":   angular.toJson($scope.championForm),
        "fbSession":  fbSessionID
      }
    };

    $http(configurationObject).then(successCallback, errorCallback);

  };

  $scope.getChampion = function() {

    var successCallback = function(payload, status) { console.log("success"); };
    var errorCallback = function(payload, status) { console.log("error"); };

    var configurationObject = {
      "method":     "POST",
      "url":        "/get_champion",
      "data":       {
        "id":       1
      }
    };

    $http(configurationObject).then(successCallback, errorCallback);

  };

  // These strings specify where the API endpoints for this view reside.
  var apiEndpoint = '/sampleResponse.json';

  // This is the callback function that executes if the HTTP request for $scope.model returns successfully.
  var getModelSuccess = function(payload, status) { $scope.model = payload; };
  // This is the callback function that executes if the HTTP request for $scope.model returns unsuccessfully.
  var getModelFailure = function(payload, status) {};

  // Initiate the HTTP request.
  httpService.getApiEndpoint(apiEndpoint).success(getModelSuccess);

}]);



// {"champions":[{"timestamp":1466490314672,"introduction":{"name":"Annie","title":"the Dark Child","portrait":"http://i.imgur.com/0ztDoTR.png","splash":"http://i.imgur.com/lMMnbq6.jpg","primary_role":"mage","secondary_role":"none","rp_cost":260,"ip_cost":450,"attack":"2","defense":"3","ability":"10","difficulty":"6"},"stats":{"health":{"level_1":512,"level_2":588,"level_3":664,"level_4":740,"level_5":816,"level_6":892,"level_7":968,"level_8":1044,"level_9":1120,"level_10":1196,"level_11":1272,"level_12":1348,"level_13":1424,"level_14":1500,"level_15":1576,"level_16":1652,"level_17":1728,"level_18":1804},"health_regen":{"level_1":5.4,"level_2":5.95,"level_3":6.51,"level_4":7.06,"level_5":7.61,"level_6":8.16,"level_7":8.72,"level_8":9.27,"level_9":9.82,"level_10":10.38,"level_11":10.93,"level_12":11.48,"level_13":12.04,"level_14":12.59,"level_15":13.14,"level_16":13.69,"level_17":14.25,"level_18":14.8},"resource":{"name":"mana","name_string":null,"level_1":334,"level_2":384,"level_3":434,"level_4":484,"level_5":534,"level_6":584,"level_7":634,"level_8":684,"level_9":734,"level_10":784,"level_11":834,"level_12":884,"level_13":934,"level_14":984,"level_15":1034,"level_16":1084,"level_17":1134,"level_18":1184},"resource_regen":{"level_1":6,"level_2":6.8,"level_3":7.6,"level_4":8.4,"level_5":9.2,"level_6":10,"level_7":10.8,"level_8":11.6,"level_9":12.4,"level_10":13.2,"level_11":14,"level_12":14.8,"level_13":15.6,"level_14":16.4,"level_15":17.2,"level_16":18,"level_17":18.8,"level_18":19.6},"range":{"level_1":575,"level_2":575,"level_3":575,"level_4":575,"level_5":575,"level_6":575,"level_7":575,"level_8":575,"level_9":575,"level_10":575,"level_11":575,"level_12":575,"level_13":575,"level_14":575,"level_15":575,"level_16":575,"level_17":575,"level_18":575},"attack_damage":{"level_1":50,"level_2":52.65,"level_3":55.29,"level_4":57.94,"level_5":60.59,"level_6":63.24,"level_7":65.88,"level_8":68.53,"level_9":71.18,"level_10":73.82,"level_11":76.47,"level_12":79.12,"level_13":81.76,"level_14":84.41,"level_15":87.06,"level_16":89.71,"level_17":92.35,"level_18":95},"attack_speed":{"base":0.579,"level_1":0,"level_2":1.36,"level_3":2.72,"level_4":4.08,"level_5":5.44,"level_6":6.79,"level_7":8.15,"level_8":9.51,"level_9":10.87,"level_10":12.23,"level_11":13.59,"level_12":14.95,"level_13":16.31,"level_14":17.66,"level_15":19.02,"level_16":20.38,"level_17":21.74,"level_18":23.1},"armor":{"level_1":19.2,"level_2":23.2,"level_3":27.2,"level_4":31.2,"level_5":35.2,"level_6":39.2,"level_7":43.2,"level_8":47.2,"level_9":51.2,"level_10":55.2,"level_11":59.2,"level_12":63.2,"level_13":67.2,"level_14":71.2,"level_15":75.2,"level_16":79.2,"level_17":83.2,"level_18":87.2},"magic_resist":{"level_1":30,"level_2":30,"level_3":30,"level_4":30,"level_5":30,"level_6":30,"level_7":30,"level_8":30,"level_9":30,"level_10":30,"level_11":30,"level_12":30,"level_13":30,"level_14":30,"level_15":30,"level_16":30,"level_17":30,"level_18":30},"movement_speed":{"level_1":335,"level_2":335,"level_3":335,"level_4":335,"level_5":335,"level_6":335,"level_7":335,"level_8":335,"level_9":335,"level_10":335,"level_11":335,"level_12":335,"level_13":335,"level_14":335,"level_15":335,"level_16":335,"level_17":335,"level_18":335}},"skills":[{"type":"passive","levels":"3","range":{"level_1":null,"level_2":null,"level_3":null,"level_4":null,"level_5":null,"level_6":null},"cost":{"type":null,"type_string":null,"level_1":null,"level_2":null,"level_3":null,"level_4":null,"level_5":null,"level_6":null},"cooldown":{"level_1":null,"level_2":null,"level_3":null,"level_4":null,"level_5":null,"level_6":null},"thumbnail":"http://i.imgur.com/NzHEVeP.png","description":"After casting four abilities, Annie's next damaging ability Stun icon stuns enemies it damages for 1.25 / 1.5 / 1.75 seconds.","scalings":[{"label":null,"label_string":null,"ratio":null,"stat":null,"stat_string":null,"level_1":null,"level_2":null,"level_3":null,"level_4":null,"level_5":null}],"name":"Pyromania"},{"type":"hotkey_q","levels":"5","range":{"level_1":625,"level_2":625,"level_3":625,"level_4":625,"level_5":625,"level_6":null},"cost":{"type":"mana","type_string":null,"level_1":60,"level_2":65,"level_3":70,"level_4":75,"level_5":80,"level_6":null},"cooldown":{"level_1":4,"level_2":4,"level_3":4,"level_4":4,"level_5":4,"level_6":null},"thumbnail":"http://i.imgur.com/7R4LcGr.png","description":"ACTIVE: Annie hurls a fireball at the target enemy, dealing magic damage.\n\nIf Disintegrate kills its target, it refunds its mana cost and half of its cooldown is immediately refreshed.","scalings":[{"label":"ability_power","label_string":null,"ratio":0.9,"stat":"ability_power","stat_string":null,"level_1":80,"level_2":115,"level_3":150,"level_4":185,"level_5":220}],"name":"Disintegrate"},{"type":"hotkey_w","levels":"5","range":{"level_1":625,"level_2":625,"level_3":625,"level_4":625,"level_5":625,"level_6":null},"cost":{"type":"mana","type_string":null,"level_1":70,"level_2":80,"level_3":90,"level_4":100,"level_5":110,"level_6":null},"cooldown":{"level_1":8,"level_2":8,"level_3":8,"level_4":8,"level_5":8,"level_6":null},"thumbnail":"http://i.imgur.com/0ikz15V.png","description":"ACTIVE: Annie releases a cone of fire in the target direction, dealing magic damage to all enemies in the area.","scalings":[{"label":"ability_power","label_string":null,"ratio":0.85,"stat":"ability_power","stat_string":null,"level_1":70,"level_2":115,"level_3":160,"level_4":205,"level_5":250}],"name":"Incinerate"},{"type":"hotkey_e","levels":"5","range":{"level_1":null,"level_2":null,"level_3":null,"level_4":null,"level_5":null,"level_6":null},"cost":{"type":"mana","type_string":null,"level_1":20,"level_2":20,"level_3":20,"level_4":20,"level_5":20,"level_6":null},"cooldown":{"level_1":10,"level_2":10,"level_3":10,"level_4":10,"level_5":10,"level_6":null},"thumbnail":"http://i.imgur.com/iHzdNw9.png","description":"ACTIVE: Annie wraps herself in a fiery aura, reducing damage taken for the next 3 seconds. Enemies who use basic attacks on Annie during this time are also dealt magic damage.","scalings":[{"label":"other","label_string":"Damage Reduction","ratio":null,"stat":null,"stat_string":null,"level_1":16,"level_2":22,"level_3":28,"level_4":34,"level_5":40},{"label":"ability_power","label_string":null,"ratio":0.2,"stat":"ability_power","stat_string":null,"level_1":20,"level_2":30,"level_3":40,"level_4":50,"level_5":60}],"name":"Molten Shield"},{"type":"hotkey_r","levels":"3","range":{"level_1":600,"level_2":600,"level_3":600,"level_4":null,"level_5":null,"level_6":null},"cost":{"type":"mana","type_string":null,"level_1":100,"level_2":100,"level_3":100,"level_4":null,"level_5":null,"level_6":null},"cooldown":{"level_1":120,"level_2":100,"level_3":80,"level_4":null,"level_5":null,"level_6":null},"thumbnail":"http://i.imgur.com/k1fpWdb.png","description":"FIRST CAST: Annie summons Tibbers to the target location in a burst of flame, dealing magic damage to all enemies in the area. He then remains on the field as a controllable minion for up to 45 seconds.\n\nSummon- Tibbers 2\t\nSECOND CAST: While Tibber is active, Summon: Tibbers can be used to move him to the target location.\n\nTibbers deals magic damage with his basic attacks, and deals magic damage every second to nearby enemies.","scalings":[{"label":"ability_power","label_string":null,"ratio":0.65,"stat":"ability_power","stat_string":null,"level_1":150,"level_2":275,"level_3":400,"level_4":null,"level_5":null},{"label":"other","label_string":"Magic Damage Per Second","ratio":0.1,"stat":"ability_power","stat_string":null,"level_1":10,"level_2":15,"level_3":20,"level_4":null,"level_5":null},{"label":"other","label_string":"Total Magic Damage","ratio":4.5,"stat":"ability_power","stat_string":null,"level_1":450,"level_2":675,"level_3":900,"level_4":null,"level_5":null}],"name":"Summon: Tibbers"}],"profile":{"biography":"There have always been those within Noxus who did not agree with the evils perpetrated by the Noxian High Command. The High Command had just put down a coup attempt from the self-proclaimed Crown Prince Raschallion, and a crack down on any form of dissent against the new government was underway. These political and social outcasts, known as the Grey Order, sought to leave their neighbors in peace as they pursued dark arcane knowledge.\n\nThe leaders of this outcast society were a married couple: Gregori Hastur, the Grey Warlock, and his wife Amoline, the Shadow Witch. Together they led an exodus of magicians and other intelligentsia from Noxus, resettling their followers beyond the Great Barrier to the northern reaches of the unforgiving Voodoo Lands. Though survival was a challenge at times, the Grey Order's colony managed to thrive in a land where so many others would have failed.\n\nYears after the exodus, Gregori and Amoline had a child: Annie. Early on, Annie's parents knew there was something special about their daughter. At the age of two, Annie miraculously ensorceled a shadow bear - a ferocious denizen of the petrified forests outside the colony - turning it into her pet. To this day she keeps her bear Tibbers by her side, often keeping him spellbound as a stuffed doll to be carried like a child's toy. The combination of Annie's lineage and the dark magic of her birthplace have given this little girl tremendous arcane power.","lore":"Annie may be one of the most powerful champions ever to have fought in a Field of Justice. I shudder to think of her capabilities when she becomes an adult.\" - High Councilor Kiersta Mandrake","strategy":"Storing a Pyromania stun for use with her Summon- Tibbers ultimate can turn the tide of a team fight.\n\nStriking killing blows on minions with Disintegrate enables Annie to farm extremely well early in the game.\n\nMolten Shield is a good spell to cast to work up to Annie's stun, so sometimes it's beneficial to grab 1 rank in it early."},"quotes":{"upon_selection":"You wanna play too? It'll be fun!","attacking":[{"string":"Take that!"},{"string":"Don't make me hurt you!"},{"string":"Eeny, meeny, miny, burn!"},{"string":"Let's count to five!"},{"string":"I want a turn!"},{"string":"Play time!"},{"string":"Can they do this?"},{"string":"This is fun!"},{"string":"Ashes, ashes, they all fall down.\""}],"movement":[{"string":"Have you seen my bear Tibbers?"},{"string":"This way!"},{"string":"Try to keep up!"},{"string":"Are we there yet?"},{"string":"I never play with matches."},{"string":"Don't be a scaredy cat!"},{"string":"Hop, skip, jump!"},{"string":"Come out, come out, wherever you are!"}],"taunt":[{"string":"Beaten by a little girl... ha!"},{"string":"You can't come to Tibbers' tea party! Bleh!"},{"string":"I'm rubber and you're... on fire!"}],"joke":[{"string":"You smell like burning!"},{"string":"What's your favorite animal? A bear?"}]},"author":"LolTemplater"}]}






