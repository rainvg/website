angular.module('rain.ui.services', []).service('ui_services', function()
{
  this.update_background = function(element, background_image)
  {
    var background = $(element).find('.background-image-holder');
    background.css('background', 'url("' + background_image + '")');
    background.children('img').hide();
    background.css('background-position', 'initial');
  };

  this.navbar_fixer = function(element, nav_properties)
  {
    var navbar = $(element).find('nav');
    var first_section_height = $('.main-container section:nth-of-type(1)').outerHeight(true);
    var nav_outer_height = $('body .nav-container nav:first').outerHeight();

    var scroll_y = window.pageYOffset;

    if (scroll_y <= 0)
    {
      if (nav_properties.nav_fixed)
      {
        nav_properties.nav_fixed = false;
        navbar.removeClass('fixed');
      }
      if (nav_properties.nav_out_of_sight)
      {
        nav_properties.nav_out_of_sight = false;
        navbar.removeClass('outOfSight');
      }
      if (nav_properties.nav_scrolled)
      {
        nav_properties.nav_scrolled = false;
        navbar.removeClass('scrolled');
      }
      return;
    }

    if (scroll_y > first_section_height)
    {
      if (!nav_properties.nav_scrolled)
      {
        navbar.addClass('scrolled');
        nav_properties.nav_scrolled = true;
        return;
      }
    }
    else
    {
      if (scroll_y > nav_outer_height)
      {
        if (!nav_properties.nav_fixed)
        {
          navbar.addClass('fixed');
          nav_properties.nav_fixed = true;
        }

        if (scroll_y > nav_outer_height * 2)
        {
          if(!nav_properties.nav_out_of_sight)
          {
            navbar.addClass('outOfSight');
            nav_properties.nav_out_of_sight = true;
          }
        }
        else
        {
          if (nav_properties.nav_out_of_sight)
          {
            nav_properties.nav_out_of_sight = false;
            navbar.removeClass('outOfSight');
          }
        }
      }
      else
      {
        if (nav_properties.nav_fixed)
        {
          nav_properties.nav_fixed = false;
          navbar.removeClass('fixed');
        }
        if (nav_properties.nav_out_of_sight)
        {
          nav_properties.nav_out_of_sight = false;
          navbar.removeClass('outOfSight');
        }
      }

      if (nav_properties.nav_scrolled)
      {
        nav_properties.nav_scrolled = false;
        navbar.removeClass('scrolled');
      }
    }

  };
});
