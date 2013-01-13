angular.module("template/accordion/accordion-group.html", []).run(function($templateCache){
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"accordion-group\">" +
    "  <div class=\"accordion-heading\" ><a class=\"accordion-toggle\" ng-click=\"isOpen = !isOpen\">{{title}}</a></div>" +
    "  <div class=\"accordion-body\" collapse=\"!isOpen\">" +
    "    <div class=\"accordion-inner\" ng-transclude></div>" +
    "  </div>" +
    "</div>");
});
