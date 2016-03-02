'use strict';

angular.module('rain.directives', ['rain.ui.services']).directive('navbar', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/navbar.html',
    controller: 'navbar-controller',
    link: function(scope, element)
    {
      var nav_properties = {nav_fixed: false, nav_scrolled: false, nav_out_of_sight: false};
      window.addEventListener('scroll', function()
      {
        ui_services.navbar_fixer(element, nav_properties);
      });

      // Mobile Menu
      $(element).find('.mobile-toggle').click(function()
      {
        $(element).find('.nav-bar').toggleClass('nav-open');
        $(this).toggleClass('active');
      });

      /*
      // Dropdown positioning
      $(element).find('.menu>li>ul').each(function()
      {
        var menu = $(this).offset();
        var farRight = menu.left + $(this).outerWidth(true);
        if (farRight > $(window).width() && !$(this).hasClass('mega-menu'))
          $(this).addClass('make-right');
        else if (farRight > $(window).width() && $(this).hasClass('mega-menu'))
        {
          var isOnScreen = $(window).width() - menu.left;
          var difference = $(this).outerWidth(true) - isOnScreen;
          $(this).css('margin-left', -(difference));
        }
      });

      // Nested menus
      $(element).find('.menu').click(function(e)
      {
        if (!e) e = window.event;
        e.stopPropagation();
        if ($(this).find('ul').length)
          $(this).toggleClass('toggle-sub');
        else
          $(this).parents('.toggle-sub').removeClass('toggle-sub');
      });
      */

      $(element).find('.menu>li>a').click(function()
      {
        //if ($(this).hasClass('inner-link'))
        $(this).parents('.nav-bar').removeClass('nav-open');
      });

      /*
      // Don't know if really useful (no behaviour revealed)
      // css for toggle-widget-handle:
      //  display: block !important;

      $(element).find('.module.widget-handle').click(function()
      {
          $(this).toggleClass('toggle-widget-handle');
      });
      */
    }
  };
}]).directive('videoSection', ['ui_services', function(ui_services)
{

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/video-section.html',
    scope: {},
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
}]).directive('topic', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/topic.html',
    transclude: true,
    scope: true,
    priority: 1500.1,
    compile: function(scope, element, attributes)
    {
      return function(scope, element, attributes, ctrl, transclude)
      {
        scope.title = attributes.title;
        scope.icon = attributes.icon;
        if(attributes.active === 'true')
          scope.active = 'active';

        element.find('.tab-content p').append(transclude());
      };
    }
  };
}).directive('aboutUsSection', ['$timeout', function($timeout)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/about-us.html',
    priority: 2,
    transclude: true,
    link: function(scope, element, attributes, ctrl, transclude)
    {
      element.find('.tabs').append(transclude());

      $timeout(function()
      {
        element.find('.tabbed-content').each(function()
        {
            $(this).append('<ul class="content"></ul>');
        });

        element.find('.tabs li').each(function()
        {
          var originalTab = $(this), activeClass = '';
          if (originalTab.is('.tabs>li:first-child'))
            activeClass = ' class="active"';

          var tabContent = originalTab.find('.tab-content').detach().wrap('<li' + activeClass + '></li>').parent();
          originalTab.closest('.tabbed-content').find('.content').append(tabContent);
        });

        element.find('.tabs li').click(function()
        {
            $(this).closest('.tabs').find('li').removeClass('active');
            $(this).addClass('active');
            var liIndex = $(this).index() + 1;
            $(this).closest('.tabbed-content').find('.content>li').removeClass('active');
            $(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
        });
      }, 0);
    }
  };
}]);
