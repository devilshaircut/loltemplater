// **************************************************
// Begin: "Forms Plugin"
// **************************************************

// This plugin manages form interactions.
// Example interactions include submission and validation.

// To use this plugin, call it from an event in the following manner:
// $rootScope.nsStateMachine.forms.submit();

AngularApp.run(['$rootScope', function($rootScope) {

  // This object holds all of the information methods for the forms plugin.
  $rootScope.nsStateMachine.forms = {};

  // This object holds form named paired to their states
  // States are also represented as objects.
  $rootScope.nsStateMachine.forms.states = {};

  // This method exposes form errors to the user.
  // It adds a class to the form which indicates the user has attempted to submit the form.
  $rootScope.nsStateMachine.forms.showErrors = function(formName) {
    $rootScope.nsStateMachine.forms.states[formName] = {};
    $rootScope.nsStateMachine.forms.states[formName].submit_attempted = true;
  };

  $rootScope.nsStateMachine.forms.submit = function(formName, formIsValid) {
    // Form is valid, so submit it.
    if ( formIsValid ) {
      // Insert code for form submission.
    }
    // Form is invalid, so expose errors to the user.
    else {
      $rootScope.nsStateMachine.forms.showErrors(formName);
    }
  };

}]);

// **************************************************
// End: "Forms Plugin"
// **************************************************


























