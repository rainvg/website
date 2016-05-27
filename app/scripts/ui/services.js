'use strict';

angular.module('rain.ui.services', []).service('ui_services', function()
{
  this.update_background = function(element, background_image)
  {
    var background = $(element).find('.background-image-holder');
    background.css('background', 'url("' + background_image + '")');
    background.children('img').hide();
    background.css('background-position', 'initial');

    setTimeout(function()
    {
      background.addClass('fadeIn');
    }, 200);
  };

  this.update_image_background = function(element, background_image)
  {
    var background = $(element).find('.background-image-holder');
    background.css('background', 'url("' + background_image + '")');
    background.children('img').hide();
    background.css('background-position', 'initial');

    setTimeout(function()
    {
      background.addClass('fadeIn');
    }, 200);
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

    if (scroll_y >= first_section_height)
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

  this.navbar_setup = function(element)
  {
    var nav = element.find('nav');
    var scroll_y = window.pageYOffset;
    var first_section_height = $('.main-container section:nth-of-type(1)').outerHeight(true);
    var nav_properties = {nav_fixed: false, nav_scrolled: false, nav_out_of_sight: false};

    setTimeout(function()
    {
      var scroll_y = window.pageYOffset;
      if (scroll_y > first_section_height)
      {
        nav.addClass('scrolled');
        nav.addClass('fixed');
        nav.addClass('outOfSight');
        nav_properties.nav_scrolled = true;
      }
    }, 500);

    if (!nav.hasClass('fixed') && !nav.hasClass('absolute'))
    {
      // Make nav container height of nav
      nav.css('min-height', $('nav').outerHeight(true));

      if ($(window).width() > 768)
        $('.parallax:nth-of-type(1) .background-image-holder').css('top', -($('nav').outerHeight(true)));

      // Adjust fullscreen elements
      if ($(window).width() > 768)
        $('section.fullscreen:nth-of-type(1)').css('height', ($(window).height() - $('nav').outerHeight(true)));
    }
    else
    {
      $('body').addClass('nav-is-overlay');

    }

    if (nav.hasClass('bg-dark'))
      element.addClass('bg-dark');

    // Fix nav to top while scrolling
    //mr_navOuterHeight = $('body .nav-container nav:first').outerHeight();

    $('.search-widget-handle .search-form input').click(function(e)
    {
      if (!e) e = window.event;
      e.stopPropagation();
    });

    // Offscreen Nav

    if($('.offscreen-toggle').length)
      $('body').addClass('has-offscreen-nav');
    else
        $('body').removeClass('has-offscreen-nav');

    $('.offscreen-toggle').click(function()
    {
      $('.main-container').toggleClass('reveal-nav');
      $('nav').toggleClass('reveal-nav');
      $('.offscreen-container').toggleClass('reveal-nav');
    });

    $('.main-container').click(function()
    {
      if($(this).hasClass('reveal-nav'))
      {
        $(this).removeClass('reveal-nav');
        $('.offscreen-container').removeClass('reveal-nav');
        $('nav').removeClass('reveal-nav');
      }
    });

    $('.offscreen-container a').click(function()
    {
      $('.offscreen-container').removeClass('reveal-nav');
      $('.main-container').removeClass('reveal-nav');
      $('nav').removeClass('reveal-nav');
    });

    // Mobile Menu
    $(element).find('.mobile-toggle').click(function()
    {
      $(element).find('.nav-bar').toggleClass('nav-open');
      $(this).toggleClass('active');
    });

    return nav_properties;
  };

  this.navbar_dropdown_setup = function(element)
  {
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

    $(element).find('.menu>li>a').click(function()
    {
      //if ($(this).hasClass('inner-link'))
      $(this).parents('.nav-bar').removeClass('nav-open');
    });

    // Don't know if really useful (no behaviour revealed)
    // css for toggle-widget-handle:
    //  display: block !important;

    $(element).find('.module.widget-handle').click(function()
    {
      $(this).toggleClass('toggle-widget-handle');
    });
  };

  this.parallax_handler = function()
  {
    // Disable parallax on mobile
    if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera))
      $('section').removeClass('parallax');
  };

  this.slider_setup = function(element)
  {
    element.find('.slider-all-controls').flexslider({
      start: function(slider)
      {
        if(slider.find('.slides li:first-child').find('.fs-vid-background video').length)
          slider.find('.slides li:first-child').find('.fs-vid-background video').get(0).play();
      },
      after: function(slider)
      {
        if(slider.find('.fs-vid-background video').length)
        {
          if(slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').length)
            slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').get(0).pause();

          if(slider.find('.flex-active-slide').find('.fs-vid-background video').length)
            slider.find('.flex-active-slide').find('.fs-vid-background video').get(0).play();
        }
      }
    });

    element.find('.slider-paging-controls').flexslider({
      animation: 'slide',
      directionNav: false
    });

    element.find('.slider-arrow-controls').flexslider({
      controlNav: false
    });

    element.find('.slider-thumb-controls .slides li').each(function()
    {
      var imgSrc = $(this).find('img').attr('src');
      $(this).attr('data-thumb', imgSrc);
    });

    element.find('.slider-thumb-controls').flexslider({
      animation: 'slide',
      controlNav: 'thumbnails',
      directionNav: true
    });

    element.find('.logo-carousel').flexslider({
      minItems: 1,
      maxItems: 4,
      move: 1,
      itemWidth: 200,
      itemMargin: 0,
      animation: 'slide',
      slideshow: true,
      slideshowSpeed: 3000,
      directionNav: false,
      controlNav: false
    });

    var setUpTweets = setInterval(function()
    {
      if ($('.tweets-slider').find('li.flex-active-slide').length)
      {
        clearInterval(setUpTweets);
        return;
      }
      else
      {
        if ($('.tweets-slider').length)
        {
          $('.tweets-slider').flexslider({
            directionNav: false,
            controlNav: false
          });
        }
      }
    }, 500);
  };

  this.inner_link_setup = function(element)
  {
    var links = $(element).find('.inner-link');
    var delay = 200;
    var timeout = null;

    links.each(function()
    {
      this.addEventListener('click', function()
      {
        $(document).find('.back-to-top.floating').addClass('forced-hidden');
      });

      window.addEventListener('scroll',function()
      {
        clearTimeout(timeout);
        timeout = setTimeout(function()
        {
          $(document).find('.back-to-top.floating').removeClass('forced-hidden');
        },delay);
      });
    });

    console.log(links);
    if(links.length)
    {
      if(links.attr('href') === '#top') offset = 0;
      links.smoothScroll(
        {
        offset: 0,
        speed: 800
      });
    }
  };

  this.section_height_setup = function(element, children, offset)
  {
    var dim = offset;
    children.each(function()
    {
      dim += $(this).outerHeight();
    });
    element.css('min-height', dim);
  };

  this.floating_back_to_top_show = function(element)
  {
    var first_section_height = $('.main-container section:nth-of-type(1)').outerHeight(true);
    var last_section_position = $('.main-container section:nth-last-of-type(1)').offset().top;
    var last_section_height = $('.main-container section:nth-last-of-type(1)').outerHeight(true);
    var scroll_y = window.pageYOffset;

    if(scroll_y < first_section_height)
      element.find('.back-to-top').removeClass('visible');
    else if(scroll_y > first_section_height && scroll_y + window.innerHeight <= last_section_position + last_section_height)
      element.find('.back-to-top').addClass('visible');
    else
      element.find('.back-to-top').removeClass('visible');
  };

  this.modal_strip_setup = function(element)
  {
    if(!element.find('.close-modal').length)
      element.append($('<i class="ti-close close-modal">'));

    if(typeof element.attr('data-cookie') !== 'undefined')
    {
      if(!mr_cookies.hasItem(element.attr('data-cookie')))
        setTimeout(function()
        {
          element.addClass('reveal-modal');
        },1000);
    }
    else
      setTimeout(function()
      {
        element.addClass('reveal-modal');
      },1000);

    $('.modal-strip .close-modal').click(function()
    {
      var modal = element.closest('.modal-strip');
      if(typeof modal.attr('data-cookie') !== 'undefined')
      {
        mr_cookies.setItem(modal.attr('data-cookie'), 'true', Infinity);
      }
      element.closest('.modal-strip').removeClass('reveal-modal');
      return false;
    });
  };

  this.generate_button = function(text, href)
  {
    var classes, button;

    href = ' href="' + href + '"';
    classes = ' class = "btn btn-lg"';
    button = $('<a' + classes + href + '>' + text + '</a>');
    return button;
  };
});
