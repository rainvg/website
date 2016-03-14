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
}).directive('aboutUs', function()
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
}).directive('parallaxPortfolioTopic', function()
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
}).directive('parallaxPortfolio', ['ui_services', function(ui_services)
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
}]).directive('parallaxSliderTopic', function()
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
}).directive('parallaxSlider', ['ui_services', function(ui_services)
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
}).directive('featuresButton', ['ui_services', function(ui_services)
{
  return {
    restrict: 'AE',
    transclude: true,
    scope: {},
    link: function(scope, element, attributes, ctrl, transclude)
    {
      var href = attributes.href;
      var text = transclude().text();
      transclude(scope.$parent, function(clone, parent_scope)
      {
        parent_scope.button = ui_services.generate_button(text, href);
      });
    }
  };
}]).directive('features', ['ui_services', function(ui_services)
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
        element.find('.button').append('<a class="btn btn-lg col-md-2 col-sm-2 col-md-push-5 col-sm-push-5" ng-href="{{href}}">Text</a>');
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

          element.find('.features-button').append(scope.button);
          scope.title = attributes.title;
          scope.image = attributes.image + '.jpeg';

          var image = element.find('.image');
          var container = element.find('.container');
          if(attributes.textalign === 'right')
          {
            image.removeClass('col-sm-push-6');
            image.removeClass('col-md-push-6');
            container.removeClass('col-sm-pull-6');
            container.removeClass('col-md-pull-6');
          }

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
}]).directive('modulesTopic', function()
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
}).directive('modules', function()
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
}).directive('last', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/last/section.html',
    transclude: true,
    link: function(scope, element)
    {
      ui_services.inner_link_setup(element);
    }
  };
}]).directive('floatingBackToTop', ['$timeout', 'ui_services', function($timeout, ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/last/floating-back-to-top.html',
    transclude: true,
    link: function(scope, element)
    {
      ui_services.inner_link_setup(element);

      window.addEventListener('scroll', function()
      {
        ui_services.floating_back_to_top_show(element);
      });
    }
  };
}]).directive('policy', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/policy/section.html',
    transclude: true,
    scope: {},
    link: function(scope, element, attributes)
    {
      scope.href = attributes.href;
      scope.buttontext = attributes.buttontext;
      ui_services.modal_strip_setup(element);
    }
  };
}]).directive('customersTopic', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/customers/topic.html',
    transclude: true,
    scope: true,
    link: function(scope, element, attributes)
    {
      scope.title = attributes.title;
      if(attributes.align === 'right')
        element.addClass('text-right');
    }
  };
}).directive('customersIcon', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/customers/icon.html',
    scope: true,
    link: function(scope, element, attributes)
    {
      scope.icon = attributes.icon;
    }
  };
}).directive('customers', ['ui_services', function(ui_services)
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/customers/section.html',
    transclude: true,
    scope: {},
    link: function(scope, element, attributes)
    {
      scope.title = attributes.title;
      scope.button = attributes.button;
      scope.link = attributes.link;
      scope.background = attributes.background + '.jpg';
      ui_services.update_background(element, scope.background);
    }
  };
}]).directive('post', function()
{
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/posts/topic.html',
    transclude: true,
    scope: {},
    compile: function()
    {
      return function(scope, element, attributes, ctrl, transclude)
      {
        scope.title = attributes.title;
        scope.link = attributes.link;
        scope.icon = attributes.icon + '.jpg';
        scope.date = attributes.date;
        scope.authorlink = attributes.authorlink;
        scope.author = attributes.author;
        scope.categorylink = attributes.categorylink;
        scope.category = attributes.category;
        element.find('.mb0').append(transclude());
      };
    }
  };
}).directive('blog', function()
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/posts/section.html',
    transclude: true,
    scope: {},
    link: function(scope, element, attributes, ctrl, transclude)
    {
      element.find('.row').append(transclude());
      scope.name = attributes.name;
    }
  };
});
