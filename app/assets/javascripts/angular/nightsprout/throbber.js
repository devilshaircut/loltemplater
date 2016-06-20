// **************************************************
// Begin: "Throbber Plugin"
// **************************************************


// This plugin creates a throbber.

// The throbber shows whenever an HTTP request has been made.
// It hides whenever that HTTP request has been completed.

AngularApp.run(['$rootScope', function($rootScope){

  // Initialize the "Throbber Plugin" on the Nightsprout State Machine.
  $rootScope.nsStateMachine.throbber = {};

  // Set a property on root scope that determines whether or not the warning popup is visible.
  $rootScope.nsStateMachine.throbber.isVisible = false;

  // Set a property on root scope that tracks the number of HTTP requests that are throbbing.
  // We use this number to determine whether or not to hide the throbber.
  // We only hide the throbber when every HTTP request has completed (i.e. property === 0).
  $rootScope.nsStateMachine.throbber.activeRequests = 0;

}]);


// This is an Angular Interceptor that intercepts HTTP requests.
// On interception, it sets the state of the throbber.
AngularApp.factory('throbber', ["$rootScope", function($rootScope) {
  var throbber = {
    request: function(config) {
      $rootScope.nsStateMachine.throbber.activeRequests = $rootScope.nsStateMachine.throbber.activeRequests + 1;
      $rootScope.nsStateMachine.throbber.isVisible = true;
      return config;
    },
    response: function(response) {
      $rootScope.nsStateMachine.throbber.activeRequests = $rootScope.nsStateMachine.throbber.activeRequests - 1;
      if ( $rootScope.nsStateMachine.throbber.activeRequests === 0 ) {
        $rootScope.nsStateMachine.throbber.isVisible = false;
      }
      return response;
    }
  };
  return throbber;
}]);


// Add the interceptor to $httpProvider.
AngularApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('throbber');
}]);


// **************************************************
// End: "Throbber Plugin"
// **************************************************


























