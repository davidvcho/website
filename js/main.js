window.onload = function() {
	init();
}

var init = function() {
	addMobileNavClickHandlers();
	addBackToTopHandler();

	injectCopyright();
}

var addBackToTopHandler = function() {
	var backToTop = document.getElementById('back-to-top');
	if (backToTop) {
		backToTop.onclick = function() {
			$("html, body").animate({scrollTop: 0}, 500);
		}	
	}
}

var injectCopyright = function() {
	var copyright = createDiv();
	copyright.classList.add('copyright');
	copyright.innerText = '\u00A9 2017 David Cho \u00B7 All Rights Reserved \u00B7'

	var filename = document.location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
	var element = filename.startsWith('index') ? document.getElementsByClassName('site-inner-wrapper')[0] : document.body;
	element.appendChild(copyright);
}

var createDiv = function() {
	return document.createElement('div');
}



var addMobileNavClickHandlers = function() {
	// Handler for navbar toggle button
	document.getElementById('mobileMenu').onclick = function() {
		document.body.classList.toggle('mobile-nav-open');
	}

	// Handlers for nav folders
	var elements = document.getElementsByClassName("mobile-folders-collection");
	for (var i = 0, len = elements.length; i < len; i++) {
	  elements[i].onclick = function() {
	  	this.classList.toggle('dropdown-open');
	  }
	}

	// Hover handler for footer social media icons
	var icons = document.getElementsByClassName('icon-wrapper');
	for (var i = 0, len = icons.length; i < len; i++) {
		icons[i].onmouseover = function() {
			// Make all other icons darker
			for (var j = 0, len = icons.length; j < len; j++) {
				icons[j].classList.add("nonhover");
			}
			this.classList.remove('nonhover');
		}
		icons[i].onmouseleave = function() {
			// Restore opacity	
			for (var j = 0, len = icons.length; j < len; j++) {
				icons[j].classList.remove("nonhover");
			}
		}
	}
}