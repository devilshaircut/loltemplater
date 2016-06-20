// **************************************************
// Begin: "Modal Plugin"
// **************************************************

// This plugin creates a modal.

// To use this plugin, call it from an event in the following manner:
// $rootScope.nsStateMachine.modal.open();

AngularApp.run(['$rootScope', function($rootScope){

  // Initialize the "Warning Popup Plugin" on the Nightsprout State Machine.
  $rootScope.nsStateMachine.modal = {};

  // Set a property on root scope that determines which modal is active.
  $rootScope.nsStateMachine.modal.currentModal = null;

  // Set a property on root scope that determines whether or not the warning popup is visible.
  $rootScope.nsStateMachine.modal.isVisible = false;

  // Set a property in root scope that stores the function for dismissing the warning popup.
  $rootScope.nsStateMachine.modal.close = function() {
    $rootScope.nsStateMachine.modal.isVisible = false;
  };

  // This is the main function call to create the warning popup.
  $rootScope.nsStateMachine.modal.open = function(desiredModal) {
    $rootScope.nsStateMachine.modal.currentModal = desiredModal;
    $rootScope.nsStateMachine.modal.isVisible = true;
  };

}]);

// **************************************************
// End: "Modal Plugin"
// **************************************************


























