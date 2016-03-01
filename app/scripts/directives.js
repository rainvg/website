angular.module('rain.directives', ['rain.ui.services']).directive('navbar', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/navbar.html',
    controller: 'navbar-controller',
    link: function(scope, element, attributes)
    {
      var nav_properties = {nav_fixed: false, nav_scrolled: false, nav_out_of_sight: false};
      window.addEventListener("scroll", function()
      {
        ui_services.navbar_fixer(element, nav_properties);
      });
    }
  };
}]).directive('videoSection', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/video-section.html',
    controller: 'video-controller',
    link: function(scope, element, attributes)
    {
      scope.background = attributes.background + '.png';
      scope.title = attributes.title;
      scope.subtitle = attributes.subtitle;
      scope.logo = attributes.logo + '.png';
      scope.video_mp4 = attributes.video + '.mp4';
      scope.video_webm = attributes.video + '.webm';

      ui_services.update_background(element, scope.background);
    }
  };
}]);
