angular.module('app', ['swiper']).controller('AppController', function($scope) {
  $scope.logSlide = function(index, slide) {
    console.log('Slide end: ', index);
  };
});