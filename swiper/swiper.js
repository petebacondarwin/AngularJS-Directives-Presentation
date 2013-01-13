angular.module('swiper', [])
.directive('swiper', function ($parse) {
  return {
    scope: true,
    link: function(scope, element, attrs) {
      element.addClass('swipe');

      var config = {};

      if ( attrs.auto ) {
        config.auto = parseInt(attrs.auto,10);
      }
      if ( attrs.startSlide ) {
        config.startSlide = parseInt(attrs.startSlide,10);
      }
      if ( attrs.speed ) {
        config.speed = parseInt(attrs.speed,10);
      }
      if ( attrs.onSlideEnd ) {
        var onSlideEnd = $parse(attrs.onSlideEnd);
        config.callback = function(e, index, slide) {
          scope.$apply(function() {
            onSlideEnd(scope, { index: index, slide: slide});
          });
        };
      }

      var swiperProperty = attrs.swiper || 'swiper';
      var swiper = new Swipe(element[0], config);

      scope[swiperProperty] = swiper;
    }
  };
});
