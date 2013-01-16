angular.module('app', [])

.directive('activity', function() {
  return function(scope, element, attrs) {
    var options = scope.$eval(attrs.options);
    
    scope.$watch(attrs.activity, function(value) {
      if ( value ) {
        element.activity(options);
      } else {
        element.activity(false);
      }
    });
  };
});