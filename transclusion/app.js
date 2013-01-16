var app = angular.module('transclusion-app', []);

app.controller('AppController', function($scope, logger) {
  $scope.logger = logger;
});

app.factory('logger', function() {
  var messages = [];
  return {
    add: function(context, message, result) {
      messages.push({ context: context, message: message, result: result });
    },
    messages: messages
  };
});

app.directive('transclude', function(logger) {
  var equal = function(a, aName, b, bName) {
    return aName + (a === b ? ' === ' : ' NOT EQUAL TO ' ) + bName;
  };
  return {
    transclude: true,
    controller: function($scope, $transclude) {
      this.transcludedElement = $transclude();
      this.clonedElement = $transclude(function() {});
      logger.add('controller', equal(this.clonedElement, 'clonedElement', this.transcludedElement, 'transcludedElement'));
    },
    compile: function(element,attrs,transclude) {
      return {
        pre: function (scope, element, attrs, controller) {
          var transcludedElement = transclude(scope);
          var clonedElement = transclude(scope, function() {});
          logger.add('pre-link', equal(clonedElement, 'Cloned Element', transcludedElement, 'Transcluded Element'));
          logger.add('pre-link', equal(transcludedElement, 'Transcluded Element', controller.transcludedElement, 'Controller Transcluded Element'));
          logger.add('pre-link', equal(clonedElement, 'Cloned Element', controller.clonedElement, 'Controller Cloned Element'));
        },
        post: function (scope, element, attrs, controller) {
          var transcludedElement = transclude(scope);
          var clonedElement = transclude(scope, function() {});
          logger.add('post-link', equal(clonedElement, 'clonedElement', transcludedElement, 'transcludedElement'));
          logger.add('post-link', equal(transcludedElement, 'transcludedElement', controller.transcludedElement, 'controller.transcludedElement'));
          logger.add('post-link', equal(clonedElement, 'clonedElement', controller.clonedElement, 'controller.clonedElement'));
        }
      };
    }
  };
});
