// SOURCE CODE AVAILABLE AT: https://github.com/danmasta/ngResize
//
// This directive works in tandem with resizeFactory.js.
//
// ngResize directive, uses throttled resize event bound to window; will bind event only once.
// Broadcasts 'resize' event from $rootScope
//
// Usage: ng-resize="expression()"
// Event data is available as $event
// Timeout is used to debounce any expressions to the end of the current digest
AngularApp.directive('ngResize', ['$parse', '$timeout', 'resize', function($parse, $timeout, resize) {
  return {
    compile: function($element, attr) {
      var fn = $parse(attr['ngResize']);
      return function(scope, element, attr) {
        resize.bind();
        scope.$on('resize', function(event, data) {
          $timeout(function() {
            scope.$apply(function() {
              fn(scope, { $event: data });
            });
          });
        });
      };
    }
  };
}]);