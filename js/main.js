window.onload = function() {
	init();
}

var init = function() {
	injectMobileNavbar();
	injectDesktopNavbar();

	injectFooter();
	injectCopyright();

	addMobileNavClickHandlers();
	addBackToTopHandler();
}

var addBackToTopHandler = function() {
	var backToTop = document.getElementsByClassName('back-to-top')[0];
	backToTop && (backToTop.onclick = function() {
		$("html, body").animate({scrollTop: 0}, 500);
	});
}

var injectMobileNavbar = function() {
	appendFirst(document.body, getNavigation(false /* isDesktop */));
}

var appendFirst = function(parent, child) {
	parent.insertBefore(child, parent.firstChild);
}

var injectDesktopNavbar = function() {
	var header = createElementWithCssName('header', 'header');
	var div = createDiv('title-nav-wrapper');

	var h = createElementWithCssName('h1', 'site-title');
	h.appendChild(createLinkWithSpan('/', 'DAVID CHO'));

	var a = createLink(null, null, 'icon-menu');
	a.id = 'mobileMenu';

	div.appendChild(h);
	div.appendChild(a);
	div.appendChild(getNavigation(true /* isDesktop */));
	header.appendChild(div);

	appendFirst(
		document.getElementsByClassName('site-inner-wrapper')[0], header);
}

var getNavigation = function(isDesktop) {
	var name = getName(isDesktop);

	var div = createDiv(name + 'Nav');
	var nav = createNav('main-nav');
	var navWrapper = createDiv('nav-wrapper');
	var ul = createUnorderedList('cf');

	div.appendChild(nav);
	nav.appendChild(navWrapper);
	navWrapper.appendChild(ul);

	ul.appendChild(createNavLink('Home', '/'));
	ul.appendChild(createNavLink('About', 'about.html'));

	var li = createListItem('folder');
	li.classList.add(name + '-folders-collection');
	var div2 = createDiv('folder-parent');
	var a = document.createElement('a');
	a.setAttribute('aria-haspopup', true);
	a.appendChild(createSpan('', 'Photography'));
	div2.appendChild(a);

	var div3 = createDiv('folder-child-wrapper');
	var ul2 = createUnorderedList('folder-child');
	ul2.appendChild(createNavLink('Portrait', 'portrait.html'));
	ul2.appendChild(createNavLink('Landscape', 'landscape.html'));

	div3.appendChild(ul2);
	div2.appendChild(div3);
	li.appendChild(div2);
	ul.appendChild(li);
	ul.appendChild(createNavLink('Contact', 'contact.html'));

	return div;
}

var createLinkWithSpan = function(href, name) {
	var a = createLink(href);
	a.appendChild(createSpan('', name));
	return a;
}

var createNavLink = function(name, href) {
	var li = createListItem('folder');
	li.appendChild(createLinkWithSpan(href, name));

	(href == '/') && (href = 'index.html');
	if (getFileName() == href) {
		li.classList.add('active-link');
	} 
	return li;
}

var createListItem = function(cssName) {
	return createElementWithCssName('li', cssName);
}

var getName = function(isDesktop) {
	return isDesktop ? 'desktop' : 'mobile';
}

var injectFooter = function() {
	var footer = createFooter('footer');
	!isHomePage() && footer.appendChild(getBackToTop());

	var footerWrapper = createDiv('footer-wrapper');
	var navDiv = createDiv('nav-div');

	var iconList = createNav('icon-list');
	var icons = [{
		'src': 'images/logos/facebook.svg', 
		'href': 'https://facebook.com/itzdcho'
	}, {
		'src': 'images/logos/instagram.png', 'href': 'http://instagram.com/dcho.i.am'
	}, {
		'src': 'images/logos/linkedin.svg', 'href': 'https://www.linkedin.com/in/davidvcho'
	}, {
		'src': 'images/logos/mail.svg', 'href': 'mailto:davidcho420@gmail.com'
	}];

	icons.forEach(function(i) {
		iconList.appendChild(createImgLink(i.src, i.href, 'icon-wrapper'));
	});

	navDiv.appendChild(iconList);
	footerWrapper.appendChild(navDiv);
	footer.appendChild(footerWrapper);

	var element = isHomePage() ? 
		document.getElementsByClassName('site-inner-wrapper')[0] : 
		document.body;
	element.appendChild(footer);
}

var getBackToTop = function() {
	var backToTop = createDiv('back-to-top-link');
	var a = createLink('#', null);
	a.id = 'back-to-top';
	a.appendChild(createSpan('arrow'));
	a.innerHTML += 'Top';
	backToTop.appendChild(a);
	return backToTop;
}

var injectCopyright = function() {
	var copyright = createDiv('copyright');
	copyright.innerText = 
		'\u00A9 2017 David Cho \u00B7 All Rights Reserved \u00B7';

	var element = isHomePage() ? 
		document.getElementsByClassName('site-inner-wrapper')[0] : 
		document.body;
	element.appendChild(copyright);
}

var getFileName = function() {
	return document.location.pathname
		.substring(location.pathname.lastIndexOf("/") + 1);
}

var isHomePage = function() {
	return getFileName().startsWith('index');
}

var createDiv = function(cssName) {
	var div = document.createElement('div');
	div.classList.add(cssName);
	return div;
}

var createLink = function(href, target, cssName) {
	var a = createElementWithCssName('a', cssName);
	href && (a.href = href);
	target && a.setAttribute('target', target);
	return a;
}

var createImg = function(src) {
	var img = document.createElement('img');
	img.src = src;
	return img;
}

var createImgLink = function(src, href, cssName) {
	var link = createLink(href, '_blank', cssName);
	link.appendChild(createImg(src));
	return link;
}

var createNav = function(cssName) {
	return createElementWithCssName('nav', cssName);
}

var createSpan = function(cssName, text) {
	var span = createElementWithCssName('span', cssName);
	text && (span.innerHTML = text);
	return span;
}

var createFooter = function(cssName) {
	return createElementWithCssName('footer', cssName);
}

var createUnorderedList = function(cssName) {
	return createElementWithCssName('ul', cssName);
}

var createElementWithCssName = function(element, cssName) {
	var e = document.createElement(element);
	cssName && cssName.length && e.classList.add(cssName);	
	return e;
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