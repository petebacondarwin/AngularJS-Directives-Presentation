angular.module('compilation', [])

.directive('logCompile', function($rootScope) {
  $rootScope.log = "";

  return {
    controller: function($scope, $attrs) {
      $rootScope.log = $rootScope.log + ($attrs.logCompile + ' (controller)\n');
    },
    compile: function compile(element, attributes) {
      $rootScope.log = $rootScope.log + (attributes.logCompile + ' (compile)\n');
      return {
        pre: function preLink(scope, element, attributes) {
          $rootScope.log = $rootScope.log + (attributes.logCompile + ' (pre-link)\n');
        },
        post: function postLink(scope, element, attributes) {
          element.prepend(attributes.logCompile);
          $rootScope.log = $rootScope.log + (attributes.logCompile + ' (post-link)\n');
        }
      };
    }
  };
})

.directive('terminate', function() {
  return {
    terminal: true
  };
});