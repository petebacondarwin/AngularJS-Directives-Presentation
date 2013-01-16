describe('activity directive', function() {
  var $scope, element, createDirective;

  // Load the swipe module
  beforeEach(module('app'));
  
  // Get hold of a scope and create a helper function for setting up tests
  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope;
    createDirective = function(config) {
      $compile("<div activity='show' options='" + config +"'></div>")($scope);
    };
  }));

  it('should call activity with the given options', function() {
    var options = {segments: 8, steps: 3, opacity: 0.3, width: 4, space: 0, length: 5, color: '#0b0b0b', speed: 1.5};
    spyOn($.fn, 'activity');
    createDirective(angular.toJson(options));
    expect($.fn.activity).toHaveBeenCalledWith(options);
  });
});