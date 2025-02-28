/**
*	Luique - Personal Portfolio HTML Template
*	Version: 1.0
*	Author: bslthemes
*	Author URL: http://themeforest.net/user/bslthemes
*	Copyright © Luique by bslthemes. All Rights Reserved.
**/

( function( $ ) {
	'use strict';

/**
	Preloader
**/
$(window).on("load", function() {
	$('body').imagesLoaded( {}, function() {
		var preload = $('.preloader');
		preload.addClass('loaded');
		preload.find('.centrize').fadeOut();

		/**
			init Cursor
		**/
		initCursor();

		/**
			init Scrolla
		**/
		$('.elementor-widget-text-editor').attr('data-animate','active');
		$('.scroll-animate').scrolla({
			once: true,
			mobile: true
		});

	});
});

$(function() {
	'use strict';

	/**
		Sections full height
	**/
	setHeightFullSection();
	$(window).resize(function() {
		setHeightFullSection();
	});

	/**
		Parallax
	**/
	$('.js-parallax').jarallax({
		speed: 0.65,
		type: 'scroll'
	});

	/**
		Block Line
	**/
	if ($('.v-line').length) {
		$('.v-line .container').append('<div class="v-line-block"><span></span></div>');
		$('.v-line .hero-started').append('<div class="v-line-block"><span></span></div>');
	}

	/**
		Splitting
	**/
	Splitting();

	/**
		Skrollr
	**/
	if ($(window).width() > 1200 ) {
	var s = skrollr.init();
	}

	/*
		Typed
	*/
	$('.subtitle.subtitle-typed').each(function(){
		var subtitleContainer = $(this);

		subtitleContainer.typed({
			stringsElement: subtitleContainer.find('.typing-title'),
			backDelay: 3500, /* Delay in text change */
			typeSpeed: 0, /* Typing speed */
			loop: true
		});
	});

	/**
		Header Sticky
	**/
	if($('.header').length) {
		$(window).on('scroll', function(event){

			if ( $(window).scrollTop() > 100 ) {
				$('.header').addClass('sticky');
				if ( this.oldScroll < this.scrollY ) {
					$('.header').addClass('animate-in');
				} else {
					if ( $(window).scrollTop() < 200 ) {
						$('.header').addClass('animate-out');
					}
				}
			} else {
				$('.header').removeClass('sticky');
				$('.header').removeClass('animate-in');
				$('.header').removeClass('animate-out');
			}

			this.oldScroll = this.scrollY;
		});
	}

	function checkScrollDirectionIsUp(event) {
		if (event.wheelDelta) {
			return event.wheelDelta > 0;
		}
		return event.deltaY < 0;
	}

	/**
		Header Switcher Button
	**/
	var skin = $.cookie('skin');
	if ( skin == 'light' ) {
		$('body').removeClass('dark-skin');
		$('body').addClass('light-skin');
	}
	if ( skin == 'dark' ) {
		$('body').removeClass('light-skin');
		$('body').addClass('dark-skin');
	}

	if ( $('body').hasClass('dark-skin') ) {
		$('.header .switcher-btn').addClass('active');
	}
	$('.header').on('click', '.switcher-btn', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('body').removeClass('dark-skin');
			$('body').addClass('light-skin');
			$.cookie('skin', 'light', { expires: 7, path: '/' });
		}
		else {
			$(this).addClass('active');
			$('body').removeClass('light-skin');
			$('body').addClass('dark-skin');
			$.cookie('skin', 'dark', { expires: 7, path: '/' });
		}
		return false;
	});

	/**
		Header Menu Button
	**/
	$('.header').on('click', '.menu-btn', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).addClass('no-touch');
			$('.menu-overlay').addClass('no-touch');
			$('body').removeClass('no-scroll');
			$('.menu-full-overlay').removeClass('is-open');
			$('.menu-full-overlay').removeClass('has-scroll');
			$('.menu-full-overlay').removeClass('animate-active');
			setTimeout(function(){
				$('.menu-full-overlay').removeClass('visible');
				$('.menu-btn').removeClass('no-touch');
				$('.menu-overlay').removeClass('no-touch');
			}, 1000);
		}
		else {
			$(this).addClass('active no-touch');
			$('.menu-overlay').addClass('no-touch');
			var height = $(window).height();
			$('.menu-full-overlay').css({'height': height});
			$('body').addClass('no-scroll');
			$('.menu-full-overlay').addClass('is-open visible');
			setTimeout(function(){
				$('.menu-full-overlay').addClass('has-scroll animate-active');
				$('.menu-btn').removeClass('no-touch');
				$('.menu-overlay').removeClass('no-touch');
			}, 1000);
		}
		return false;
	});
	$('.menu-full-overlay').on('click', '.menu-overlay', function(){
		$('.menu-btn').removeClass('active');
		$('.menu-btn').addClass('no-touch');
		$('.menu-overlay').addClass('no-touch');
		$('body').removeClass('no-scroll');
		$('.menu-full-overlay').removeClass('is-open');
		$('.menu-full-overlay').removeClass('has-scroll');
		$('.menu-full-overlay').removeClass('animate-active');
		setTimeout(function(){
			$('.menu-full-overlay').removeClass('visible');
			$('.menu-btn').removeClass('no-touch');
			$('.menu-overlay').removeClass('no-touch');
		}, 1000);
		return false;
	});

	/*
		Top Menu
	*/
	$('.menu-full').on('click', 'a', function(){
		if (!$(this).parent().hasClass('has-children')){
			$('.header .menu-btn.active').trigger('click');
		}
	});

	/*
		Header Menu Dropdown
	*/
	$('.menu-full .has-children > a').append('<i class="fas fa-chevron-down"></i>');
	$('.menu-full').on('click', '.has-children > a', function(){
		if($(this).closest('li').hasClass('opened')) {
			$(this).closest('li').removeClass('opened');
			$(this).closest('li').addClass('closed');
			$(this).closest('li').find('> ul').slideUp();
		} else {
			$(this).closest('ul').find('> li').removeClass('closed').removeClass('opened');
			$(this).closest('ul').find('> li').find('> ul').slideUp();
			$(this).closest('li').addClass('opened');
			$(this).closest('li').find('> ul').slideDown();
		}
		return false;
	});

	/*
		Carousel Testimonials
	*/
	var swiperTestimonials = new Swiper('.js-testimonials', {
    slidesPerView: 3,
	  spaceBetween: 30,
		watchSlidesVisibility: true,
		noSwipingSelector: 'a',
		loop: false,
		speed: 1000,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		navigation: false,
		breakpoints: {
			// when window width is >= 320px
			0: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			// when window width is >= 480px
			767: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			// when window width is >= 640px
			1024: {
				slidesPerView: 3,
				spaceBetween: 40
			}
		}
	});

	/*
		Initialize portfolio items
	*/
	var $container = $('.works-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.works-col',
			percentPosition: true,
		});
	});
	// Change it later
	var $gal_container = $('.m-gallery');
	$gal_container.imagesLoaded(function() {
		$gal_container.isotope({
			itemSelector: '.col-lg-6',
			percentPosition: true,
		});
	});

	/*
		Filter items on button click
	*/
	$('.filter-links').on( 'click', 'a', function() {
		var filterValue = $(this).attr('data-href');
		$container.isotope({ filter: filterValue });

		$('.filter-links a').removeClass('active');
		$(this).addClass('active');

		if (!$(filterValue).find('.scroll-animate').hasClass('animate__active')) {
			$(filterValue).find('.scroll-animate').addClass('animate__active');
		}

		return false;
	});
	/**
		Tabs
	**/
	$('.tab-menu').on('click', '.tab-btn', function(){
		var tab_bl = $(this).attr('href');

		$(this).closest('.tab-menu').find('li').removeClass('active');
		$(this).closest('li').addClass('active');

		$(this).closest('.tabs').find('> .tab-item').hide();
		$(tab_bl).fadeIn();

		return false;
	});

	/**
		Collapse
	**/
	// Skills Section collapse functionality closed on Default
	$(document).ready(function() {
		$('.lui-collapse-item').removeClass('opened');
		$('.lui-collapse-btn').removeClass('active');
	
		$('.lui-collapse-item').on('click', '.lui-collapse-btn', function() {
			var $parent = $(this).closest('.lui-collapse-item');
			
			if ($parent.hasClass('opened')) {
				$parent.removeClass('opened');
				$(this).removeClass('active');
			} else {
				$parent.addClass('opened');
				$(this).addClass('active');
			}
		});
	});
	
	/**
		Cart Popup
	**/
	$('.header .cart-btn .cart-icon').on('click', function(){
		if($(this).closest('.cart-btn').hasClass('opened')){
			$(this).closest('.cart-btn').removeClass('opened');
			$(this).closest('.cart-btn').find('.cart-widget').hide();
		} else {
			$(this).closest('.cart-btn').addClass('opened');
			$(this).closest('.cart-btn').find('.cart-widget').fadeIn();
		}
		return false;
	});

});

function initCursor() {
	var mouseX=window.innerWidth/2, mouseY=window.innerHeight/2;

	var cursor = {
		el: $('.cursor'),
		x: window.innerWidth/2,
		y: window.innerHeight/2,
		w: 30,
		h: 30,
		update:function() {
			var l = this.x-this.w/2;
			var t = this.y-this.h/2;
			this.el.css({ 'transform':'translate3d('+l+'px,'+t+'px, 0)' });
		}
	}

	$(window).mousemove (function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	$('a, .swiper-pagination, .swiper-button-prev, .swiper-button-next, button, .button, .btn, .lnk').hover(function() {
		$('.cursor').addClass("cursor-zoom");
	}, function(){
		$('.cursor').removeClass("cursor-zoom");
	});

	setInterval(move,1000/60);

	function move() {
		cursor.x = lerp (cursor.x, mouseX, 0.1);
		cursor.y = lerp (cursor.y, mouseY, 0.1);
		cursor.update()
	}

	function lerp (start, end, amt) {
		return (1-amt)*start+amt*end
	}

	/*
		Validate Contact Form
	*/
	if($('.contacts-form').length) {
	$('#cform').validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: 'valid',
		submitHandler: function() {
			$.ajax({
				url: 'mailer/feedback.php',
				type: 'post',
				dataType: 'json',
				data: 'name='+ $("#cform").find('input[name="name"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&subject='+ $("#cform").find('input[name="subject"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function() {

				},
				complete: function() {

				},
				success: function(data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});
	}
}

function setHeightFullSection() {
	var width = $(window).width();
	var height = $(window).height();

	/* Set full height in started blocks */
	$('.error-page, .menu-full-overlay, .preloader .centrize').css({'height': height});
}

} )( jQuery );

// Newly ADDED CODE

// Show or hide the button based on scroll position
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Contact Me Form Popup Functionality
  function handleButtonClick(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && subject && message) {
      const alertMessage = document.querySelector("#alert-success p").innerText;

      const overlay = document.createElement("div");
      overlay.classList.add("overlay", "visible");
      document.body.appendChild(overlay);

      const popup = document.createElement("div");
      popup.classList.add("popup-card", "visible");
      popup.innerHTML = `
        <img src="assets/images/popup-contactme.png" alt="Success Icon">
        <h1>Thank You</h1>
        <h3>Thanks for Reaching Out!</h3>
        <p>${alertMessage}</p>
      `
      ;
      document.body.appendChild(popup);
      setTimeout(() => {
        popup.remove();
        overlay.remove();
      }, 10000);

      document.getElementById("cform").reset();
    } else {}        
  }

  $(document).ready(function () {
    var allClicked = false; 
    $('.works-col:nth-child(n+7)').hide();
    $('.filter-links .lui-subtitle').click(function (e) {
        e.preventDefault();
        $('.filter-links .lui-subtitle').removeClass('active');
        $(this).addClass('active');
        var category = $(this).data('href');
        if (category === '.works-col' || category === 'all') {
            $('.works-col').show();
            $('.works-col:nth-child(n+7)').hide();
            $('#load-more-btn').show();
            allClicked = true;
        } else {
            // Hide all items first
            $('.works-col').hide();

            // Show only items matching the category
            $(category).fadeIn();

            $('.load-more-link, #load-more-btn').show();
            allClicked = false;
        }
    });
});


  // popup.js

// Function to create the popup dynamically
function createPopup() {
  let popupHTML = `
      <div id="overlay" class="overlay"></div>
      <div id="consultationPopup" class="popup-container">
          <div class="popup-content">
              <span class="close-btn">X</span>
              <div class="contacts-form">
                  <h3>Book Your Free Consultation</h3>
                  <form id="consultationForm">
                      <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                          <div class="group">
                            <label>
                              Your Full Name <b>*</b>
                              <input type="text" name="name" id="name" >
                            </label>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                          <div class="group">
                            <label>
                              Your Email Address <b>*</b>
                              <input type="email" name="email" id="email" >
                            </label>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div class="group">
                            <label>
                              Your Subject <b>*</b>
                              <input type="text" name="subject" id="subject">
                            </label>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div class="group">
                            <label>
                              Your Message <b>*</b>
                              <textarea name="message" id="message"></textarea>
                            </label>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-right">
                          <a href="#" class="btn" onclick="$('#cform').submit(); return false;">
                            <span>Send Message</span>
                          </a>
                        </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', popupHTML);
}

// Function to show popup
function showPopup() {
  document.getElementById('consultationPopup').style.display = 'flex';
  document.getElementById('overlay').style.display = 'block';
}

// Function to hide popup
function hidePopup() {
  document.getElementById('consultationPopup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Initialize popup
document.addEventListener('DOMContentLoaded', function() {
  createPopup(); // Inject the popup into the page

  document.querySelectorAll('.consultationButton').forEach(button => {
      button.addEventListener('click', showPopup);
  });

  document.querySelector('.close-btn').addEventListener('click', hidePopup);
  document.getElementById('overlay').addEventListener('click', hidePopup);
});

function filterWorks(category) {
      const worksBox = document.getElementById('works-box');
      const worksItems = document.querySelectorAll('.works-col');
      let visibleItems = 0;

      worksItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
          visibleItems++;
        } else {
          item.style.display = 'none';
        }
      });

      worksBox.style.height = (visibleItems * 300) + 'px'; // Adjust the height based on the number of visible items
    }
