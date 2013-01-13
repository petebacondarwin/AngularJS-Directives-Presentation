describe('blink directive', function() {
  var $scope, element, $timeout;

  beforeEach(module('blink-app'));
  beforeEach(inject(function($rootScope, $compile, _$timeout_) {
    $scope = $rootScope;
    element = $compile('<blink>Some Content</blink>')($scope);
    $timeout = _$timeout_;
  }));

  it('should be show its content', function() {
    expect(element.text()).toBe('Some Content');
  });

  it('should be toggle visible after each timeout', function() {
    expect(element.css('visibility')).toBe('visible');
    $timeout.flush();
    expect(element.css('visibility')).toBe('hidden');
    $timeout.flush();
    expect(element.css('visibility')).toBe('visible');
  });
});