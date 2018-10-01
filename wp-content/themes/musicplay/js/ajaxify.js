//Version 1.5.2
(function(window,undefined){

	// Prepare our Variables
	var
		History = window.History,
		$ = window.jQuery,
		document = window.document;

	// Check to see if History.js is enabled for our Browser
	if ( !History.enabled ) return false;

	// Wait for Document
	$(function(){
		// Prepare Variables
		var
			// Application Specific Variables 
			rootUrl = aws_data['rootUrl'],
			ThemeDir = aws_data['ThemeDir'],
			choose_player = aws_data['choose_player'],
			contentSelector = '#ajaxwrap',
			$content = $(contentSelector),
			contentNode = $content.get(0),
			// Application Generic Variables 
			$body = $(document.body),
			scrollOptions = {
				duration: 800,
				easing:'swing'
			};

	// Ensure Content
		if ( $content.length === 0 ) $content = $body;

		// Internal Helper
		$.expr[':'].internal = function(obj, index, meta, stack){
			// Prepare
			var
				$this = $(obj),
				url = $this.attr('href')||'',
				isInternalLink;

			// Check link
			isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;

			// Ignore or Keep
			return isInternalLink;
		};


 	// HTML Helper
		var documentHtml = function(html){
			// Prepare
			var result = String(html).replace(/<\!DOCTYPE[^>]*>/i, '')
									 .replace(/<(html|head|body|title|script)([\s\>])/gi,'<div id="document-$1"$2')
									 .replace(/<\/(html|head|body|title|script)\>/gi,'</div>');
			// Return
			return result;
		};

	$.fn.ajaxify = function(){
			// Prepare
			var $this = $(this);

			// Ajaxify
			$this.find('a:internal:not(.no-ajaxy,[href^="#"],[href*="wp-login"],[href*="wp-admin"],[data-rel^="prettyPhoto"],[target="_blank"])').live('click', function(event){
            // Prepare
          var
					$this	= $(this),
					//  latin url addresses working
					//url		= decodeURIComponent($this.attr('href')),
					url		= $this.attr('href'),
					title 	= $this.attr('title') || null;

				// Continue as normal for cmd clicks etc
				if ( event.which == 2 || event.metaKey ) return true;

				// Ajaxify this link
				History.pushState(null,title,url);
				event.preventDefault();
				return false;
			});
			// Chain
			return $this;
		};


   	// Ajaxify our Internal Links
		$body.ajaxify();

		// Hook into State Changes
		$(window).bind('statechange',function(){
			// Prepare Variables
			var
			State 		= History.getState(),
			url			= State.url,
			relativeUrl = url.replace(ThemeDir,'');
				var preloader_image = aws_data[ 'preloader_image' ];

			// Set Loading
			$body.addClass('loading');
	

        // Start Fade Out
			// Animating to opacity to 0 still keeps the element's height intact
			// Which prevents that annoying pop bang issue when loading in new content
			$content.animate({opacity:1},6000);
  		 if ( preloader_image != '' && typeof preloader_image!== 'undefined') {
         		$content.html('<div id="preloader_iva_wrap"><img src="'+ preloader_image +'" /></div>') .css('text-align', 'center');
			}else{
  				$content.html('<div id="preloader_iva_wrap"><div id="preloader_iva"><span></span><span></span><span></span><span></span><span></span></div></div>').css('text-align', 'center');
			}
         
         // Ajax Request the Traditional Page
         $.ajax({
           url: url,
				success: function(data, textStatus, jqXHR){
					// Prepare
					var
						$data 			= $(documentHtml(data)),
						$dataBody		= $data.find('#document-body:first ' + contentSelector),
						bodyClasses 	= $data.find('#document-body:first').attr('class'),
						contentHtml, $scripts;
					
					var $menu_list = $data.find('.menuwrap');
				

			//Add classes to body
					jQuery('body').attr('class', bodyClasses);
					
					// Fetch the scripts
					$scripts = $dataBody.find('#document-script');
					if ( $scripts.length ) $scripts.detach();

					// Fetch the content
					contentHtml = $dataBody.html()||$data.html();

					if ( !contentHtml ) {
						document.location.href = url;
						return false;
					}

					// Update the content
					$content.stop(true,true);
					$content.html(contentHtml)
							.ajaxify()
							.css('text-align', '')
							.animate({opacity: 1, visibility: "visible"});
				
			   
					$('.menuwrap').html($menu_list.html());
             		//Adding no-ajaxy class to a tags present under ids provided
					$(aws_data['ids']).each(function(){
						jQuery(this).addClass('no-ajaxy');
					});
					
					// Update the title
					document.title = $data.find('#document-title:first').text();
					try {
						document.getElementsByTagName('title')[0].innerHTML = document.title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
					}
					catch ( Exception ) { }

					// Add the scripts
					$scripts.each(function(){
						var $script = $(this), 
							scriptText = $script.html(), 
							scriptNode = document.createElement('script');
						try {
							// doesn't work on ie...
							scriptNode.appendChild(document.createTextNode(scriptText));
							contentNode.appendChild(scriptNode);
						} catch(e) {
							// IE has funky script nodes
							scriptNode.text = scriptText;
							contentNode.appendChild(scriptNode);
						}
						if($(this).attr('src') != null) {
							scriptNode.setAttribute('src', ($(this).attr('src')));
						}
					});

					// Load Custom Script
					atpcustom.atpinit();
					atpcustom.buttondata();
					atpcustom.flexslider();
					atpcustom.accordion();
					atpcustom.progressbar();
					atpcustom.tabs();
					atpcustom.hoverimage();	
					atpcustom.mobilemenu();
					$("#atp_menu").superfish({
													   cssArrows: false // cssArrows
					});

						jQuery('.iva-mobile-dropdown').click(function(){

							jQuery('.iva-mobile-menu').slideToggle(500);
							 return false;
						});
	 				
					if( choose_player  == 'radio') {
						var my_jPlayer = jQuery("#jquery_jplayer_1");
						jQuery(".album-playlist .fap-single-track").click(function () {  

							 jQuery('.selected').removeClass('selected');
							 jQuery(this).addClass("selected");
					
							});
						 jQuery('.djmix-content .fap-single-track').on('click', function () {

						 		jQuery('.djmix-content').removeClass("selected");
								if (jQuery(this).hasClass('selected')) {
									jQuery(this).removeClass("selected");
								} else {
									jQuery(this).addClass("selected");
								}

							});
						jQuery(".fap-single-track").click(function(e) {
								$("span.jp-desc").html('');
								my_jPlayer.jPlayer("setMedia", {
									mp3: jQuery(this).attr("href"),
									title: jQuery(this).attr("title"),
				
								});
								var first_track = true;
								my_jPlayer.jPlayer("play");
								first_track = false;
								$(this).blur();
								return false;
						});
					}
					$body.removeClass('loading');
					scriptNode = document.createElement('script');
					contentNode.appendChild(scriptNode);
					//scriptNode.setAttribute('src', rootUrl + 'wp-content/plugins/contact-form-7/includes/js/scripts.js');
					scriptNode.setAttribute('src', ThemeDir + 'js/isotope_ajaxcallback.js');

					// Inform Google Analytics of the change
					if ( typeof window.pageTracker !== 'undefined' ) window.pageTracker._trackPageview(relativeUrl);

					// Inform ReInvigorate of a state change
					if ( typeof window.reinvigorate !== 'undefined' && typeof window.reinvigorate.ajax_track !== 'undefined' )
						reinvigorate.ajax_track(url);// ^ we use the full url here as that is what reinvigorate supports
				},
				error: function(jqXHR, textStatus, errorThrown){
					document.location.href = url;
					return false;
				}

			}); // end ajax

		}); // end onStateChange

	}); // end onDomLoad
 
})(window); // end closure
jQuery(document).ready(function(){	
	//append anchor tag to DOM to make the search in site ajaxify.
	var searchButtonHtml = '<span id="ajax-search" style="display:none;"><a href=""></a></span>'
	jQuery("body").prepend(searchButtonHtml);

	//Make the link ajaxify.
	jQuery("#ajax-search").ajaxify();

	//After submitting the search form search the post without refreshing the browser.
	jQuery('.iva_search_btn').live('click',
		function(event){
			var host = aws_data['rootUrl'] + "?s="+ jQuery('#search_val').val() +"&iva_search_keyword=Musicplay_Custom_Search&iva_custom_search_select="+ jQuery("#cs_posttype").val() +"&iva_search_input=";
			jQuery("#ajax-search a").attr("href", host + jQuery('.iva_search').val());
			jQuery("#ajax-search a").trigger("click");
			event.preventDefault();
		}
	);
});
