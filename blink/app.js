var app = angular.module('blink-app', []);

app.directive('blink', function($timeout) {

  function isVisible(element) {
    return element.css('visibility') === 'visible';
  }

  function show(element) {
    element.css('visibility','visible');
  }

  function hide(element) {
    element.css('visibility','hidden');
  }

  var doBlink = function(element) {
    var delay;
    if ( isVisible(element)) {
      hide(element);
      delay = 250;
    } else {
      show(element);
      delay = 750;
    }
    $timeout(function() { doBlink(element); }, delay);
  };

  return {
    restrict: 'E',
    link: function(scope, element) {
      doBlink(element);
    }
  };
});