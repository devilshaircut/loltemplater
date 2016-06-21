// ****************************************************************************************************
// 
// 0. Documentation / Introduction
// 
// ****************************************************************************************************
//
//
// **************************************************
// Summary
// **************************************************
//
// Most UI interactions happen inside of the "nsStateMachine" object.
// nsStateMachine is a state machine that tracks page state.
// Page states include things like UI drawers opening, modal overlays, warning messages, etc.
// nsStateMachine is stored on $rootScope so any view/controller that has access to $rootScope can have its state tracked.
//
// The Angular router is not used.
// Instead, we rely on Rails to provide routing.
// This gives us somewhat more flexibility in terms of what we can use this Shell project on.
// For example, we can be sure that Google can crawl these pages without having to hack it.
//
// Likewise, the Angular controllers are managed via Rails.
// Without using Rails to accomplish this, we would need to use the Angular router or an Angular directive on a wrapping HTML element.
// These solutions are clumsy and not what we desire in a generalized platform solution.
// To specify an Angular controller for a view, simply assign it in the view's Rails controller.
//
//
// **************************************************
// JS Guidelines
// **************************************************
//
// - Use Angular over jQuery where possible.
// - Eventually we will JSLint everything and also write more tests.
// - ALWAYS use the Angular "array" syntax for dependency injection, or our JS will NOT compile on Heroku.
// - When possible, document your code LIBERALLY.
// - When possible, write JS that reads roughly like an English sentence.
// - Leave inline notes (e.g. "TO-DO" notes) for revisiting code, especially when something is left incomplete.
// 
//
// ****************************************************************************************************


// **************************************************
// Create main Angular module/app.
// **************************************************

var AngularApp = angular.module("AngularApp", ["ngRoute", "ngAnimate"]);


// **************************************************
// Global Filters
// **************************************************

// AngularApp.filter('filterName', function () {  });


// **************************************************
// Rootscope Properties, including nsStateMachine.
// **************************************************

// Set some easily accessible properties on $rootScope for use throughout the app.
AngularApp.run(['$rootScope', '$http', function($rootScope, $http){

  // Object for holding all Nightsprout boilerplate functionality.
  // Tentatively, we refer to this as "Nightsprout State Machine".
  $rootScope.nsStateMachine = {

    // Property to hold the current year.
    'currentYear': new Date().getFullYear(),

    // Property to manage the navigation drawer.
    // It store its open/closed state.
    // It has methods for showing/hiding/toggling the drawer.
    // This is not done as a separate module because it is intrinsic to how the project works.
    'navDrawer': {
      'isVisible': false,
      'show':   function() { $rootScope.nsStateMachine.navDrawer.isVisible = true;  },
      'hide':   function() { $rootScope.nsStateMachine.navDrawer.isVisible = false; },
      'toggle': function() { $rootScope.nsStateMachine.navDrawer.isVisible = !$rootScope.nsStateMachine.navDrawer.isVisible; }
    },

  };

  $http.defaults.headers.common.Authorization = 'Client-ID 692db5455ad0fa9';

}]);


function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    testAPI();
  } else if (response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '1766179986959206',
  cookie     : true,
  xfbml      : true,
  version    : 'v2.5'
});

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {

    // This is gross, but we need to give Angular access to the FB session data.
    var $body = angular.element(document.body);
    var $rootScope = $body.injector().get('$rootScope');
    $rootScope.$apply(function () {
      $rootScope.fbSession = response;
    });

    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}










