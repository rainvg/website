'use strict';

angular.module('rain.directives', ['rain.ui.services']).directive('navbarItem', function()
{
  return {
    restrict: 'AE',
    replace: 'true',
    templateUrl: 'scripts/directives/navbar/item.html',
    scope: true,
    transclude: true,
    link: function(scope, element, attributes, ctrl, transclude)
    {
      console.debug('Running navbar-item linking function. Scope id is:', scope.$id);

      scope.target = attributes.target;

      if(attributes.externalHref)
        scope.target = attributes.externalHref;

      transclude(scope.$parent, function(clone, parent_scope)
      {
        element.find('a:first').append(clone);
        element.css('display','inline-block');
        parent_scope.should_render = true;
      });
    }
  };
})
.directive('navbar', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/navbar/section.html',
    scope: {},
    transclude: true,
    link: function(scope, element, attributes, ctrl, transclude)
    {
      console.debug('Running navbar linking function. Scope id is:', scope.$id);
      scope.rendered = false;
      scope.should_render = false;

      var nav_properties = {nav_fixed: false, nav_scrolled: false, nav_out_of_sight: false};

      transclude(scope, function(clone)
      {
        element.find('ul.menu').append(clone);
      });

      var remove_watcher = scope.$watch('should_render', function(should_render)
      {
        if(should_render)
        {
          if(scope.rendered)
          {
            remove_watcher();
            return;
          }

          console.debug('Rendering navbar');

          window.addEventListener('scroll', function()
          {
            ui_services.navbar_fixer(element, nav_properties);
          });

          ui_services.navbar_setup(element);
          ui_services.navbar_dropdown_setup(element);
          ui_services.inner_link_setup(element);

          scope.rendered = true;
        }
      });
    }
  };
}]).directive('videoSection', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/video/section.html',
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
}]).directive('aboutUsTopic', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/about-us/topic.html',
    transclude: true,
    scope: true,
    link: function(scope, element, attributes, ctrl, transclude)
    {
      console.debug('Running about-us-topic linking function. Scope id is:', scope.$id);
      if(attributes.active === 'true')
        scope.active = 'active';

      scope.title = attributes.title;
      scope.icon = attributes.icon;

      transclude(scope.$parent, function(clone, parent_scope)
      {
        element.find('.tab-content p').append(clone);
        parent_scope.should_render = true;
      });
    }
  };
}).directive('aboutUsSection', function()
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/about-us/section.html',
    transclude: true,
    scope: {},
    link: function(scope, element, attributes, ctrl, transclude)
    {
      console.debug('Running about-us-section linking function. Scope id is:', scope.$id);
      scope.rendered = false;
      scope.should_render = false;

      transclude(scope, function(clone)
      {
        element.find('.tabs').append(clone);
      });

      var remove_watcher = scope.$watch('should_render', function(should_render)
      {
        if(should_render)
        {
          if(scope.rendered)
          {
            remove_watcher();
            return;
          }

          console.debug('Rendering about-us section');
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

          scope.rendered = true;
        }
      });
    }
  };
}).directive('coffeeTopic', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/parallax-portfolio/topic.html',
    transclude: true,
    scope: {},
    compile: function()
    {
      return function(scope, element, attributes, ctrl, transclude)
      {
        scope.title = attributes.title;
        scope.icon = attributes.icon;

        element.find('.feature p').append(transclude());
      };
    }
  };
}).directive('coffeeSection', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/parallax-portfolio/section.html',
    transclude: true,
    scope: {},
    link: function(scope, element, attributes, ctrl, transclude)
    {
      element.find('.coffee-topic').append(transclude());
      scope.background = attributes.background + '.jpg';
      scope.title = attributes.title;
      scope.subtitle = attributes.subtitle;
      ui_services.update_background(element, scope.background);
    }
  };
}]).directive('forestTopic', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/parallax-slider/topic.html',
    transclude: true,
    scope: true,
    link: function(scope, element, attributes, ctrl, transclude)
    {
      scope.author = attributes.author;
      scope.from = attributes.from;
      if(attributes.active === 'true')
        element.toggleClass('active');

      transclude(scope.$parent, function(clone, parent_scope)
      {
        element.find('.lead').append(clone);
        parent_scope.should_render = true;
      });
    }
  };
}).directive('forestSection', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/parallax-slider/section.html',
    transclude: true,
    scope: {
      icons:'=',
    },
    link: function(scope, element, attributes, ctrl, transclude)
    {
      transclude(scope, function(clone)
      {
        element.find('.slides').append(clone);
      });

      var remove_watcher = scope.$watch('should_render', function(should_render)
      {
        if(should_render)
        {
          if(scope.rendered)
          {
            remove_watcher();
            return;
          }
          scope.background = attributes.background + '.jpg';
          scope.title = attributes.title;

          ui_services.update_background(element, scope.background);
          ui_services.slider_setup(element);
          //scope.rendered = true;
        }
      });
    }
  };
}]).directive('featuresTopic', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/features/topic.html',
    transclude: true,
    scope: true,
    link: function(scope, element, attributes, ctrl, transclude)
    {
      scope.title = attributes.title;
      scope.icon = attributes.icon;

      transclude(scope.$parent, function(clone, parent_scope)
      {
        element.find('.right p').append(clone);
        parent_scope.should_render = true;
      });
    }
  };
}).directive('featuresSection', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/features/section.html',
    transclude: true,
    scope: {},
    link: function(scope, element, attributes, ctrl, transclude)
    {
      scope.rendered = false;
      scope.should_render = false;

      transclude(scope, function(clone)
      {
        element.find('.features').append(clone);
      });

      var remove_watcher = scope.$watch('should_render', function(should_render)
      {
        if(should_render)
        {
          if(scope.rendered)
          {
            remove_watcher();
            return;
          }
          scope.title = attributes.title;
          scope.image = attributes.image + '.jpeg';

          var children = element.find('.features').children();
          ui_services.section_height_setup(element, children, 300);

          window.addEventListener('resize', function()
          {
            ui_services.section_height_setup(element, children, 300);
          });

          scope.rendered = true;
        }
      });
    }
  };
}]).directive('lastSectionTopic', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/modules/topic.html',
    transclude: true,
    scope: true,
    link: function(scope, element, attributes, ctrl, transclude)
    {
      scope.title = attributes.title;
      scope.icon = attributes.icon;
      element.find('.feature p').append(transclude());
    }
  };
}).directive('lastSection', function()
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/modules/section.html',
    transclude: true,
    scope: {},
    link: function(scope, element, attributes, ctrl, transclude)
    {
      element.find('.list').append(transclude());
      scope.title = attributes.title;
      scope.rendered = true;
    }
  };
}).directive('backToTopSection', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/back-to-top/section.html',
    transclude: true,
    link: function(scope, element)
    {
      ui_services.inner_link_setup(element);
    }
  };
}]);
