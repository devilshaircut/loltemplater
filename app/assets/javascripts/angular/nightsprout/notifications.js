// **************************************************
// Begin: "Notifications Plugin"
// **************************************************

// This plugin allows for the creation of notifications.

// It exposes methods for managing notifications.
// Methods include notification creation and deletion, etc.

AngularApp.run(['$rootScope', '$timeout', function($rootScope, $timeout){

  // Initialize the "Notifications Plugin" on the Nightsprout State Machine.
  $rootScope.nsStateMachine.notifications = {};

  // Some views may have multiple notifications.
  // This object stores the the states of multiple notifications.
  //
  // This is the JSON schema it works with:
  //
  // nsStateMachine.notifications.state = {
  //   notification1: {
  //     type: "warning",
  //     message: "This is a warning!",
  //     timeCreated: 1411760387822,
  //     show: false
  //   },
  //   notification2: {
  //     type: "caution",
  //     message: "This is a caution!",
  //     timeCreated: 1411760387822,
  //     show: false
  //   },
  //   notification3: {
  //     type: "success",
  //     message: "This is a success!",
  //     timeCreated: 1411760387822,
  //     show: true
  //   }
  // }
  $rootScope.nsStateMachine.notifications.state = {};

  // This object holds methods for interacting with notifications.
  $rootScope.nsStateMachine.notifications.methods = {

    // Method for creating a notification.
    // Use case would be inside of a controller after something successfully completed.
    "createNotification": function(notificationID, notificationType, notificationMessage) {
      $rootScope.nsStateMachine.notifications.state[notificationID] = {
        type: notificationType,
        message: notificationMessage,
        timeCreated: new Date().getTime(),
        show: true
      };
    },

    // Method for deleting a notification.
    // Example use case would be a dismiss notification button.
    "deleteNotification": function(notificationID) {
      $rootScope.nsStateMachine.notifications.state[notificationID].show = false;
      var deleteNotification = function() {
        delete $rootScope.nsStateMachine.notifications.state[notificationID];
      };
      $timeout(deleteNotification, 500);
    }

  };

}]);

// **************************************************
// End: "Notifications Plugin"
// **************************************************












