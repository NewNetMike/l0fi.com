//
(function ($) {
    atpcustom = {
        atpinit: function () {

            /* ------------------------------------- */
            $(".minithumb, .grid, .gallery-item, .postimg, .port_img, .bio, .mejs-video, .mejs-overlay-play").preloadify({
                force_icon: "true",
                mode: "sequence"
            });

            /* ------------------------------------- */
            $("a[data-rel^='prettyPhoto']").prettyPhoto({
                theme: 'pp_default',
 				social_tools: false,
				 deeplinking : false
            });
			
			jQuery('li span.lyrics').click(function () {
        		jQuery(this).closest('.mp3options').next('div').slideToggle();
        		jQuery(this).parent().parent().siblings().children().next().next('.lyricdesc').slideUp();
        		return false;
   			});

            /* ------------------------------------- */
            $('.atpsocials li').hover(function () {
                $(this).find('span.ttip').fadeIn();
            }, function () {
                $(this).find('span.ttip').fadeOut();
            });

             /* ------------------------------------- */
            $("span.close").click(function () {
                $(this).parent().hide();
                $(this).parent().animate({
                    opacity: '0'
                }).slideUp(400);
            });

			jQuery(".track-select").click(function () {
				jQuery('ul').children().removeClass('selected');
				jQuery(this).closest('li').addClass('selected');
			});
		 
			jQuery(".hoverdjmix.fap-single-track").click(function () {
				jQuery('.selected').removeClass('selected');
				jQuery(this).addClass('selected').parents('.hover_type').addClass('selected');
			});

			jQuery(".tracklist-details .fap-single-track").click(function () {  
					jQuery('.tracklist-details').children().removeClass('selected');
					jQuery(this).closest('div').addClass('selected');
		    	
				});
				if(  iva_panel.ajaxify == 'enabled' ) {
					choose_player = aws_data['choose_player'];
					if ( choose_player !== 'radio') {
						jQuery('.fap-single-track').on('click',function(){
							jQuery.fullwidthAudioPlayer.setPlayerPosition('open', true );
						});
					}
				}
			/* --------------Hover Socialicons----------------------- */
			$('.album-playlist li').hover(function () {
				$(this).find('span.ttip').fadeIn();
			}, function () {
				$(this).find('span.ttip').fadeOut();
			});
			 jQuery('#testimonialsubmit').click(function()
	   					 {
						jQuery.post(atp_panel.SiteUrl+'/framework/includes/testimonial_submission.php', 
							jQuery("#testimonialid").serialize(),
							function(responseText) {
								document.getElementById("testimonialstatus").innerHTML=responseText;
									if(responseText.search('success') > -1){
										jQuery("#testimonialid").find('input, textarea').val("");
									}
							});
						});
			/* ------------------------------------- */
			$('.video-frame,.boxcontent,.video-stage,.video').fitVids();
			/* ------------------------------------- */

			// fade in #back-top
			$(function () {
			
			if(window.innerWidth >= 1024){
				$(window).scroll(function () {
					if ($(this).scrollTop() > 100) {
						$('#back-top').fadeIn();
					} else {
						$('#back-top').fadeOut();
					}
				});
			
				// scroll body to 0px on click
				$('#back-top a').click(function () {
					$('body,html').animate({
						scrollTop: 0
					}, 800);
			
				   return false;
				});
			}
			});

			
		  jQuery('ul.fap-my-playlist li > a').click(function(){
           	$(this).parent().addClass("selected").siblings().removeClass("selected");
 		   });
		

			//  Like post

			jQuery('.PostLike').on('click',function(e){

			e.preventDefault();
			var task = jQuery(this).attr("data-action");
			var post_id = jQuery(this).attr("data-id");

				jQuery.ajax({
					type : "post",
					dataType : "html",
					url: iva_panel.ajaxurl,
					data : {action: "iva_like_post_process_vote", task : task, post_id : post_id},
					success: function(response) {
					jQuery('.iva_like_post .likes_count'+post_id).html(response);
					}
				
				});
  
		});

		// Tracks Likes
		jQuery('.track_like').on('click',function(e){
			e.preventDefault();
			var task = jQuery(this).children().next().attr("data-action");
			var track_id = jQuery(this).children().next().attr("data-id");

			jQuery.ajax({
				type : "post",
				dataType : "html",
				url: iva_panel.ajaxurl,
				data : {action: "iva_track_like", task : task, track_id : track_id},
				success: function(response) {
					jQuery('span.likes_count-'+track_id).html(response);
				}
			
			});
  
		});

		jQuery( ".iva_music_download,.music_download" ).click(function() {
			var iva_file 	= jQuery(this).attr("data-download");
			var iva_id 		= jQuery(this).attr("data-id");
			var dcount 		= jQuery('.iva_dcount',this);
			dcount.text( parseInt( dcount.text())+1);
			var download_count = dcount.text();

			jQuery.post(
				atp_panel.SiteUrl+"/musicband/music_download.php",
				{ 
				type:iva_file,
				},
				function(response) {
					window.location	= atp_panel.SiteUrl+"/musicband/music_download.php?type="+ iva_file + "&iva_id="+ iva_id + "&dcount=" + download_count + "";
				}
			);	
		});	


		jQuery( ".fap-download-album" ).click(function() {
		   var albumid = jQuery(this).attr("data-albumid");    
		   jQuery.post(
		    atp_panel.SiteUrl+"/musicband/music_all_download.php",
		    { 
		     albumid:albumid,
		    },
		    function(response) {
		       window.location = atp_panel.SiteUrl+"/musicband/music_all_download.php?albumid="+albumid+"";
		    }
		   ); 
		});
		
		// track hit count
			jQuery('a.fap-single-track').on('click',function(e){

 				if(jQuery(this).hasClass('trackcount')){
					   e.preventDefault();
					}else{
						var trackid=jQuery(this);
						var attach_id = trackid.attr("data-id");
						
						jQuery.ajax({
							type : "post",
							dataType : "html",
							url: iva_panel.ajaxurl,
							data : {action: "iva_track_count", attach_id : attach_id},
							success: function(response) {
								jQuery('span.ivaplay-'+attach_id).html(response);
								
							}
						
						});
				}				

				jQuery(this).addClass('trackcount');
			});

	
	

        },
/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	Testimonials Slider
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
        MySlider: function (interval, id) {
            var slides;
            var cnt;
            var amount;
            var i;

            function run() {
                // hiding previous image and showing next
                $(slides[i]).fadeOut('slow', function () {
                    // Animation complete.
                    i++;
                    if (i >= amount) i = 0;
                    $(slides[i]).fadeIn('slow');

                    // updating counter
                    cnt.text(i + 1 + ' / ' + amount);
                });


                // loop
                setTimeout(run, interval);
            }

            //slides = $('.testimonials > li');
            slides = jQuery('#' + id + ' .testimonials > li');
            cnt = $('#counter');
            amount = slides.length;
            i = 0;

            // updating counter
            cnt.text(i + 1 + ' / ' + amount);

            if (amount > 1) setTimeout(run, interval);
        },

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	T O G G L E S 
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	Accordion
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
        accordion: function () {
            jQuery('.ac_wrap').each(function () {
                tabid = jQuery(this).attr('id');
                //jQuery("#" + tabid + " .ac_title:eq(1)").addClass("active");
                jQuery("#" + tabid + " .ac_content:not('.active')").hide();
            });

            jQuery(".ac_wrap .ac_title").click(function () {
                jQuery(this).next(".ac_content").slideToggle(400, 'swing').siblings(".ac_content:visible").slideUp(400, 'swing');
                jQuery(this).toggleClass("active");
                jQuery(this).siblings(".ac_title").removeClass("active");
            });
        },

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	B U T T O N   D A T A   A T T R I B U T E S
 -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
        buttondata: function () {
            jQuery(".btn").hover(function () {
                var $hoverBg = jQuery(this).attr('btn-hoverBg');
                var $hoverColor = jQuery(this).attr('btn-hoverColor');

                if ($hoverBg != undefined) {
                    jQuery(this).css('background-color', $hoverBg);
                } else {}
                if ($hoverColor != undefined) {
                    jQuery('span', this).css('color', $hoverColor);
                } else {}
            }, function () {
                var $btncolor = jQuery(this).attr('btn-color');
                var $btnbg = jQuery(this).attr('btn-bg');
                if ($btnbg != undefined) {
                }
                if ($btncolor != undefined) {
                    jQuery('span', this).css('color', $btncolor);
                }
                    jQuery(this).css('background-color', $btnbg);
            });
        },
/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	Tabs
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
        tabs: function () {
            jQuery('.systabspane ').each(function () {
                tabid = jQuery(this).attr('id');

                jQuery("#" + tabid + " .tab_content").hide(); // Hide all tab conten divs by default
                jQuery("#" + tabid + " .tab_content:first").show(); // Show the first div of tab content by default
                jQuery("#" + tabid + " ul.tabs li:first").addClass("current"); // Show the current by default
            });
            jQuery("ul.tabs li").click(function () { //Fire the click event
                tab_id = jQuery(this).parents('.systabspane').attr("id");
                var activeTab = jQuery(this).attr("id"); // Catch the click link
                jQuery("#" + tab_id + " ul li").removeClass("current"); // Remove pre-highlighted link
                jQuery(this).addClass("current"); // set clicked link to highlight state
                jQuery("#" + tab_id + " .tab_content").hide(); // hide currently visible tab content div
                jQuery(activeTab).fadeIn(600); // show the target tab content div by matching clicked link.
            });
        },
/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	P R O G R E S S B A R
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
        progressbar: function () {
            jQuery('.progress_bar').each(function () {
                var percent = jQuery(this).attr('data_width');
                jQuery(this).animate({
                    width: percent
                }, 1500);
            });
        },

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	H O V E R  I M A G E
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
        hoverimage: function () {
		jQuery('.hover_type').animate({opacity: 0});

		jQuery(".port_img, .sort_img").hover(function() {
			jQuery(this).find('.hover_type').css({display:'block'}).animate({
				opacity: 1, 
				bottom: (jQuery('.port_img, .sort_img').height())/2 - 20+'px'}, 200, 'swing');

			jQuery(this).find('img').fadeTo(300,0.4);
			
		},function() {
			jQuery(this).find('.hover_type').animate({
				opacity: 0,
				bottom: '100%'}, 200, 'swing', function() {
				jQuery(this).css({'bottom':'0'});
			});
			jQuery(this).find('img').fadeTo(300,1);
		});
		},

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	Mobile Menu
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
        mobilemenu: function () {

	         // show meun starting from iPad Portrait
			if( window.innerWidth < 768 ){
				jQuery('.header #menuwrap').hide();
			}else {
				jQuery('.header #menuwrap').show();
				jQuery('.iva-mobile-menu').hide();
			}
			
        },
/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	Flex Slider
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

        flexslider: function () {
            jQuery('.flexslider').flexslider({
                animation: "slide",
                //String: Select your animation type, "fade" or "slide"
                controlsContainer: ".flex-container",
                slideshow: true,
                //Boolean: Animate slider automatically
                slideshowSpeed: 3000,
                //Integer: Set the speed of the slideshow cycling, in milliseconds
                animationDuration: 1000,
                //Integer: Set the speed of animations, in milliseconds
                directionNav: true,
                //Boolean: Create navigation for previous/next navigation? (true/false)
                controlNav: false,
                //Boolean: Create navigation for paging control of each clide? Note: Leave true for	
                mousewheel: false,
                slideshow: false
            });

        }
    };

})(jQuery);

	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
		Waypoint jQuery
	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
	jQuery(document).ready(function ($) {
		jQuery('.iva_anim').waypoint(function (event) {
			jQuery(this).each(function (index) {
				var jQuerythis = jQuery(this);
				var animatedclass = jQuery(this).attr('data-id');
				if (typeof animatedclass !== 'undefined' && animatedclass !== false) {
					jQuerythis.delay(0 * (index + 1)).queue(function () {
						jQuerythis.addClass('animated  ' + animatedclass + '');
					});
				}
			});
		});
	});

	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
		Fixed Header Effect
	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

	jQuery(window).scroll(function () {
		 var sc = jQuery(window).scrollTop();
		if (sc > 75) {
			jQuery(".fixed-header").addClass("scroll");
		} else {
			jQuery(".fixed-header").removeClass("scroll");
		}
	});

	jQuery(document).ready(function ($) {
		 $("#trigger").click(function () {
                $(this).next("#sticky").slideToggle({
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
            jQuery("#trigger").toggle(function () {
                jQuery(this).animate({
                    top: 5
                }, 50).animate({
                    top: 5
                }, 50).animate({
                    top: 5
                }, 800).addClass("active");
            }, function () {
                jQuery(this).animate({
                    top: 5
                }, 50).animate({
                    top: 5
                }, 50).animate({
                    top: 5
                }, 800).removeClass("active");
            });


        $(document).on('click', '.toggle-title', function() {  
           //  var tid=jQuery(this).attr('id');
                     
           jQuery(this).next(" .toggle_content").slideToggle({
              duration: 200
           });
			
			jQuery(this).toggleClass('active');
			
           return false;
        });
		jQuery("#atp_menu").superfish({
			cssArrows: false	// cssArrows
			});
		atpcustom.atpinit();
		//systoggle();
		atpcustom.buttondata();
		atpcustom.flexslider();
		atpcustom.accordion();
		atpcustom.progressbar();
		atpcustom.tabs();
		atpcustom.hoverimage();
	
		atpcustom.mobilemenu();
		jQuery(window).resize(function () {
			atpcustom.mobilemenu();
			jQuery('.iva_mmenu .menu-item').click(function () {

			jQuery(".iva-mobile-menu").css('display', 'none');
	
			});
		});

		jQuery('.iva-mobile-dropdown').click(function(){

			jQuery('.iva-mobile-menu').slideToggle(500);
			 return false;
		});
	 
		// Child Menu Toggle
		jQuery('.iva-children-indenter').click(function(){
			jQuery(this).parent().parent().toggleClass('iva-menu-open');
			jQuery(this).parent().parent().find('> ul').slideToggle();
			
			return false;
		});
		jQuery('.iva_mmenu .menu-item').click(function () {

			jQuery(".iva-mobile-menu").css('display', 'none');
	
		});
		// Mobile  Footer Margin
		var isMobile_class = jQuery(document.body).hasClass('iva_mobile');

		if( isMobile_class ) {
			jQuery('#footer').css({'margin':'0'});
			jQuery('#back-top').hide();
		}
	
		// Radio Player Switcher
		jQuery(".jp-close-btn").toggle(function () {
                jQuery(this).parents(".jp-radio").animate({bottom: -80} ,300);
            },function () {
			jQuery(this).parents(".jp-radio").animate({bottom: 0} ,300);
		});

	});

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window) {

    'use strict';
    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);

        function systoggle() {
			
            jQuery(".toggle-title").toggle(function () {
                jQuery(this).addClass("active");
            }, function () {
                jQuery(this).removeClass("active");
            });

           
			// Radio Player Switcher
			jQuery(".jp-close-btn").toggle(function () {
                jQuery(this).parents(".jp-radio").animate({bottom: -80} ,300);
            },function () {
				jQuery(this).parents(".jp-radio").animate({bottom: 0} ,300);
			});

			jQuery('li span.lyrics').click(function () {
        		jQuery(this).closest('.mp3options').next('div').slideToggle();
        		jQuery(this).parent().parent().siblings().children().next().next('.lyricdesc').slideUp();
        		return false;
   			});

        }
jQuery(window).load(function() {
		jQuery('.iva_page_loader').fadeOut(600);
	});