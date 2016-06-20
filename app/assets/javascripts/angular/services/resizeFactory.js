// SOURCE CODE AVAILABLE AT: https://github.com/danmasta/ngResize
//
// This factory works in tandem with resizeDirective.js.
//
// Factory for checking and binding resize event to window.
//
// Broadcasts 'resize' event from $rootScope which gets inherited
// by all child scopes
AngularApp.factory('resize', ['$window', '$interval', '$rootScope', function($window, $interval, $rootScope) {
  return {
    checkBind: function() {
      if (angular.isUndefined($rootScope.catchResize)) return false;
      return $rootScope.catchResize;
    },
    setBind: function() {
      var w = angular.element($window);
      var resizeThrottle = 100;
      var resized = false;
      var timer = false;
      w.on('resize', function(event) {
        if (!resized) {
          timer = $interval(function() {
            if (resized) {
              resized = false;
              $interval.cancel(timer);
              $rootScope.$broadcast('resize', {
                width: $window.innerWidth,
                height: $window.innerHeight
              });
            }
          }, resizeThrottle);
        }
        resized = true;
      });
      w.triggerHandler('resize');
      $rootScope.catchResize = true;
    },
    bind: function(){
      if (!this.checkBind()) return this.setBind();
    }
  };
}]);