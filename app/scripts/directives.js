angular.module('rain.directives', []).directive('navbar', function()
{
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scripts/directives/navbar.html',
    controller: 'navbar-controller',
    link: function(scope, element, attributes)
    {
      var navbar = $(element).find('nav');
      var first_section_height = $('.main-container section:nth-of-type(1)').outerHeight(true);
      var nav_outer_height = $('body .nav-container nav:first').outerHeight();
      var nav_fixed = false;
      var nav_scrolled = false;
      var nav_out_of_sight = false;

      window.addEventListener("scroll", function()
      {
        var scroll_y = window.pageYOffset;

        if (scroll_y <= 0)
        {
          if (nav_fixed)
          {
            nav_fixed = false;
            navbar.removeClass('fixed');
          }
          if (nav_out_of_sight)
          {
            nav_out_of_sight = false;
            navbar.removeClass('outOfSight');
          }
          if (nav_scrolled)
          {
            nav_scrolled = false;
            navbar.removeClass('scrolled');
          }
          return;
        }

        if (scroll_y > first_section_height)
        {
          if (!nav_scrolled)
          {
            navbar.addClass('scrolled');
            nav_scrolled = true;
            return;
          }
        }
        else
        {
          if (scroll_y > nav_outer_height)
          {
            if (!nav_fixed)
            {
              navbar.addClass('fixed');
              nav_fixed = true;
            }

            if (scroll_y > nav_outer_height * 2)
            {
              if (!nav_out_of_sight)
              {
                navbar.addClass('outOfSight');
                nav_out_of_sight = true;
              }
            }
            else
            {
              if (nav_out_of_sight)
              {
                nav_out_of_sight = false;
                navbar.removeClass('outOfSight');
              }
            }
          }
          else
          {
            if (nav_fixed)
            {
              nav_fixed = false;
              navbar.removeClass('fixed');
            }
            if (nav_out_of_sight)
            {
              nav_out_of_sight = false;
              navbar.removeClass('outOfSight');
            }
          }

          if (nav_scrolled)
          {
            nav_scrolled = false;
            navbar.removeClass('scrolled');
          }
        }
      }, false);
    }
  };
});
