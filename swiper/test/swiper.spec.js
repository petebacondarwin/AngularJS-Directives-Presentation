describe('swipe directive', function() {
  var $scope, element, swipeElement, swipeOptions, createDirective;

  // Load the swipe module
  beforeEach(module('swiper'));
  
  // Mock out the Swipe object
  beforeEach(function() {
    window.Swipe = function(element, options) {
      swipeElement = element;
      swipeOptions = options;
    };
  });

  // Get hold of a scope and create a helper function for setting up tests
  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope;
    createDirective = function(attributes) {
      element = $compile('<div swiper ' + attributes +'></div>')($scope);
    };
  }));

  afterEach(function() {
    // Tidy up after ourselves
    if ( element ) {
      element.remove();
    }
    element = $scope = swipeElement = swipeOptions = createDirective = undefined;
  });

  it('should add swipe CSS class to the element', function() {
    createDirective();
    expect(element.hasClass('swipe')).toBe(true);
  });

  it('should instantiate a Swipe object, passing in the DOM element from the directive', function() {
    createDirective();
    expect(swipeElement).toBe(element[0]);
    expect(swipeOptions).toEqual({});
  });

  it('should convert attributes into a Swipe options object, converting strings to numbers', function() {
    createDirective('auto="500" speed="1000" start-slide="1" on-slide-end="logSlide(index, slide)"');
    expect(swipeOptions).toEqual({
      auto: 500,
      speed: 1000,
      startSlide: 1,
      callback: jasmine.any(Function)
    });
  });

  it('should execute the given on-slide-end expression when the callback is invoked', function() {
    $scope.onSlideEndSpy = jasmine.createSpy('onSlideEnd');
    createDirective('on-slide-end="onSlideEndSpy()"');
    $scope.$digest();
    expect($scope.onSlideEndSpy).not.toHaveBeenCalled();
    swipeOptions.callback();
    expect($scope.onSlideEndSpy).toHaveBeenCalled();
  });

  it('should run a digest when the callback is invoked', function() {
    spyOn($scope, '$digest');
    createDirective('on-slide-end="x=2"');  // We need to provide some expression to trigger the directive to run a digest
    expect($scope.$digest).not.toHaveBeenCalled();
    swipeOptions.callback();
    expect($scope.$digest).toHaveBeenCalled();
  });

  it('should create a new child scope', function() {
    createDirective();
    // element.scope() is a special angular function for accessing the current scope on an element
    // You should not use this in application controllers!!
    var elementScope = element.scope();
    expect(elementScope.$parent).toBe($scope);
  });

  it('should attache Swipe API functions to the child scope', function() {
    createDirective();
    var elementScope = element.scope();
    expect(elementScope.swiper).toBeDefined();
  });

  it('should use the swiper attribute to specify the name of the scope property', function() {
    createDirective('="mySwipe"');
    var elementScope = element.scope();
    expect(elementScope.mySwipe).toBeDefined();
  });
});