var dateSet = new Set(['1/15/15','1/16/15','1/19/15','1/20/15','1/21/15','1/22/15','1/23/15','1/25/15','1/28/15','1/31/15','2/6/15','2/8/15','2/9/15','2/10/15','2/11/15','2/18/15','2/20/15','2/22/15','2/23/15','3/2/15','3/4/15','3/7/15','3/10/15','3/12/15','3/17/15','3/18/15','3/21/15','3/23/15','4/6/15','4/8/15','4/12/15','4/15/15','4/18/15','4/19/15','4/23/15','4/28/15','4/29/15','4/30/15','5/4/15','5/5/15','5/9/15','5/21/15','5/22/15','5/26/15','5/27/15','5/28/15','6/2/15','6/3/15','6/4/15','6/5/15','6/8/15','6/9/15','6/10/15','6/11/15','6/12/15','6/15/15','6/16/15','6/18/15','6/19/15','6/22/15','6/23/15','6/24/15','6/25/15','6/26/15','6/29/15','6/30/15','7/1/15','7/2/15','7/6/15','7/7/15','7/8/15','7/9/15','7/10/15','7/13/15','7/14/15','7/15/15','7/16/15','7/17/15','7/20/15','7/21/15','7/22/15','7/23/15','7/24/15','7/27/15','7/28/15','7/29/15','7/30/15','8/3/15','8/4/15','8/5/15','8/6/15','8/10/15','8/11/15','8/13/15','8/14/15','8/19/15','8/25/15','8/26/15','8/27/15','8/28/15','9/2/15','9/7/15','9/10/15','9/13/15','9/15/15','9/16/15','9/17/15','9/23/15','9/24/15','9/26/15','9/27/15','9/29/15','9/30/15','10/1/15','10/2/15','10/5/15','10/7/15','10/13/15','10/14/15','10/15/15','10/17/15','10/19/15','10/20/15','10/23/15','10/25/15','10/30/15','10/31/15','11/2/15','11/3/15','11/4/15','11/5/15','11/7/15','11/9/15','11/11/15','11/12/15','11/15/15','11/17/15','11/19/15','11/21/15','11/23/15','11/30/15','12/1/15','12/2/15','12/3/15','12/4/15','12/5/15','12/7/15','12/8/15','12/9/15','12/10/15','12/11/15','12/12/15','12/14/15','12/1/15','12/20/15','12/21/15','12/22/15','12/23/15','12/24/15','12/26/15','12/27/15','12/28/15','12/29/15','12/30/15','12/31/15','1/2/16','1/3/16','1/9/16','1/11/16','1/12/16','1/13/16','1/14/16','1/16/16','1/18/16','1/19/16','1/21/16','1/22/16','1/24/16','1/25/16','1/27/16','1/28/16','1/29/16','1/31/16','2/1/16','2/4/16','2/8/16','2/10/16','2/12/16','2/13/16','2/14/16','2/15/16','2/16/16','2/17/16','3/1/16','3/2/16','3/3/16','3/4/16','3/5/16','3/6/16','3/7/16','3/8/16','3/9/16','3/10/16','3/11/16','3/13/16','3/14/16','3/16/16','3/21/16','3/22/16','3/26/16','4/4/16','4/5/16','4/6/16','4/7/16','4/8/16','4/9/16','4/10/16','4/11/16','4/12/16','4/13/16','4/14/16','4/17/16','4/18/16','4/19/16','4/21/16','4/24/16','4/25/16','4/26/16','4/27/16','4/28/16','4/29/16','5/1/16','5/2/16','5/3/16','5/4/16','5/5/16','5/9/16','5/10/16','5/15/16','5/18/16','5/20/16','7/21/16','7/24/16','7/25/16','9/12/16','9/13/16','9/14/16','9/15/16','9/19/16','9/20/16','9/22/16','9/26/16','9/27/16','9/28/16','9/30/16','10/3/16','10/4/16','10/5/16','10/6/16','10/12/16','10/13/16','10/14/16','10/18/16','10/19/16','10/22/16','10/24/16','10/25/16','10/31/16','11/1/16','11/2/16','11/3/16','11/5/16','11/7/16','11/8/16','11/9/16','11/10/16','11/11/16','11/14/16','11/15/16','11/16/16','11/18/16','11/21/16','11/22/16','11/23/16','11/28/16','11/29/16','11/30/16','12/1/16','12/2/16','12/5/16','12/6/16','12/7/16','12/8/16','12/10/16','12/12/16','12/13/16','12/20/16','12/21/16','12/22/16','12/27/16','12/28/16','12/30/16','1/7/17','1/9/17','1/10/17','1/11/17','1/12/17','1/17/17','1/18/17','1/19/17','1/20/17','1/24/17','1/25/17','1/29/17','1/30/17','2/1/17','2/3/17','2/6/17','2/7/17','2/8/17','2/12/17','2/13/17','2/14/17','2/15/17','2/16/17','2/22/17','2/23/17','2/26/17','2/27/17','2/28/17','3/1/17','3/3/17','3/6/17','3/7/17','3/10/17','3/13/17','3/14/17','3/15/17','3/16/17','3/17/17','3/21/17','2/22/17','2/23/17','3/25/17','3/27/17','3/28/17','4/10/17','4/11/17','4/12/17','4/13/17','4/16/17','4/17/17','4/18/17','4/19/17','4/22/17','4/23/17','4/24/17','4/25/17','5/3/17','5/4/17','5/9/17','5/15/17','5/31/17','6/2/17','6/5/17','6/8/17','6/12/17','6/14/17','6/16/17','6/19/17']);

var svgNS = "http://www.w3.org/2000/svg";  

window.onload = function() {
	init();
}

var init = function() {
	var activity = document.getElementById('activity');

	for (var i = 2015; i < 2018; i++) {
		var div = createDiv(i);
		// div.classList.add('activity-date');
		div.appendChild(createSvg(i));
		activity.appendChild(div);
	}
}

var createSvg = function(year) {
	var svg = document.createElementNS(svgNS, 'svg');
	svg.setAttribute('height', '130');
	svg.setAttribute('width', '1118');

	var labels = createGroup();
	labels.appendChild(createYear(year));

	var days = 'SMTWTFS';
	for (var i = 0; i < days.length; i++) {
		labels.appendChild(createDay(days[i], 15.2 + i * 18));
	}

	// var temp = createGroup();
	var dates = createGroup();
	var date = new Date(year, 0, 1);
	var week = 0;
	while (date.getFullYear() == year) {
		dates.appendChild(createDate(date, date.getDay(), week, dates));
		date.setDate(date.getDate() + 1);
		if (date.getDay() == 0) {
			week++;
		}	
	}

	dates.onmouseleave = function() {
		var el = document.getElementById('hover-rect');
		if (el) {
			dates.removeChild(el);
			document.getElementById(year).removeChild(document.getElementById('activity-date'));
		}
	}

	var paths = createGroup();
	for (var i = 11; i >= 0; i--) {
		paths.appendChild(createPath(year, i));	
	}


	

	// var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	svg.appendChild(createDefs());
	svg.appendChild(labels);
	svg.appendChild(dates);
	svg.appendChild(paths);

	return svg;
}

var createText = function() {
	var text = document.createElementNS(svgNS, 'text');
	text.classList.add('svg-text');
	text.setAttribute('text-anchor', 'middle');
	return text;
}

var createYear = function(year) {
	var text = createText();
	text.classList.add('svg-text-year');
	text.innerHTML = year;
	text.setAttribute('x', 106);
	text.setAttribute('y', 122);
	text.setAttribute('transform', 'rotate(270 47.6 121.99999999999999)');
	text.setAttribute('fill', '#dfdfdf');
	return text;
}

var createDay = function(day, y) {
	var text = createText();
	text.classList.add('svg-text-day');
	text.innerHTML = day
	text.setAttribute('x', 61.5);
	text.setAttribute('y', y);
	text.setAttribute('fill', '#888888');
	return text;
}

var createDate = function(date, row, col, dates) {
	var rect = document.createElementNS(svgNS, 'rect');
	rect.classList.add('svg-text-date');
	rect.setAttribute('width', 18);
	rect.setAttribute('height', 18);
	rect.setAttribute('stroke', '#ffffff');
	rect.setAttribute('stroke-width', 1);
	// rect.setAttribute('fill', '#add8e6');
	rect.setAttribute('x', getX(col));
	rect.setAttribute('y', getY(row));
	

	var d = new Date(date);
	var dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() % 100;

	if (dateSet.has(dateString)) {
		rect.setAttribute('style', 'fill: #c9dcfb');	
	} else {
		rect.setAttribute('style', 'fill: url(#_ABSTRACT_RENDERER_ID_0)');	
	}

	rect.onmouseenter = function() {
		var el = document.getElementById('hover-rect');
		if (el) {
			dates.removeChild(el);
			document.getElementById(d.getFullYear()).removeChild(document.getElementById('activity-date'));
		}

		var r = document.createElementNS(svgNS, 'rect');
		r.setAttribute('width', 18);
		r.setAttribute('height', 18);
		if (dateSet.has(dateString)) {
			r.setAttribute('style', 'fill: transparent');
		} else {
			r.setAttribute('style', 'fill: #fff');
		}
		
		r.setAttribute('stroke', '#000');
		r.setAttribute('stroke-width', 2);
		r.setAttribute('x', getX(col));
		r.setAttribute('y', getY(row));
		r.setAttribute('id', 'hover-rect');
		dates.appendChild(r);

		var div = document.createElement('div');
		div.setAttribute('id', 'activity-date');
		div.innerHTML = d.toDateString().substring(4);
		div.style.left = getX(col) + 68 + document.getElementById('activity').getBoundingClientRect().left + 'px';
		var top = getY(row) + 89 + 155 * (d.getFullYear() - 2015);
		if (d.getFullYear() == 2015 && d.getDay() < 2) {
			top += 70;
		}
		div.style.top = top + 'px';
		document.getElementById(d.getFullYear()).appendChild(div);
	}

	return rect;
}

var getX = function(col) {
	return 71 + 18 * col;
}

var getY = function(row) { 
	return 2 + 18 * row;
}

var createSvgElement = function(cssName) {
	return document.createElementNS(svgNS, cssName);
}

var createGroup = function() {
	return createSvgElement('g');
}

var createPath = function(year, month) {
	var first = new Date(year, month, 1);

	var firstSunday = new Date(year, 0, 1);
	firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());

	var sunday = new Date(year, month, 1);
	sunday.setDate(sunday.getDate() - sunday.getDay());

	var days = Math.ceil((sunday.getTime() - firstSunday.getTime()) / (1000 * 3600 * 24));
	var weeks = days / 7;

	var x1 = getX(weeks);
	var y1 = getY(first.getDay());

	var pathString = first.getDate() != 0 ? start(getX(weeks+1), getY(0)) + vertical(y1) + horizontal(x1) : start(x1, y1);

	// At first saturday
	first = new Date(year, month, 7 - first.getDay());
	var y2 = getY(first.getDay() + 1);

	var last = first;

	do {
		last = new Date(year, month, last.getDate() + 7);
	} while (new Date(year, month, last.getDate() + 7).getMonth() == month);

	weeks += (last.getDate() - first.getDate()) / 7;
	var x2 = getX(weeks+1);
	pathString += vertical(y2) + horizontal(x2);

	last = new Date(year, month + 1, 1);
	last.setDate(last.getDate() - 1);
	
	if (last.getDay() != 6) {
		pathString += vertical(getY(last.getDay() + 1)) + horizontal(getX(weeks + 2));
	}

	pathString += vertical(getY(0)) + end();

	var path = createSvgElement('path');

	if (year < new Date().getFullYear() || month <= new Date().getMonth()) {
		path.setAttribute('stroke', '#000');
	} else {
		path.setAttribute('stroke', '#c9c9c9');
	}

	path.setAttribute('stroke-width', 1);
	path.setAttribute('fill', 'none');
	path.setAttribute('d', pathString);
	return path;
}

var start = function(x, y) {
	return 'M ' + x + ' ' + y + ' ';
}

var vertical = function(y) {
	return 'V ' + y + ' ';
}

var horizontal = function(x) {
	return 'H ' + x + ' ';
}

var end = function() {
	return 'Z';
}

var createDefs = function() {
	var defs = createSvgElement('defs');
	var pattern = createSvgElement('pattern');
	pattern.setAttribute('patternUnits', 'userSpaceOnUse');
	pattern.setAttribute('x', 0);
	pattern.setAttribute('y', 0);
	pattern.setAttribute('width', 6);
	pattern.setAttribute('height', 6);
	pattern.setAttribute('viewBox', '0 0 4 4');

	var rect = createSvgElement('rect');
	rect.setAttribute('fill', '#e8e8e8');
	rect.setAttribute('x', 0);
	rect.setAttribute('y', 0);
	rect.setAttribute('width', 4);
	rect.setAttribute('height', 4);

	var g = createSvgElement('g');
	g.setAttribute('stroke', '#f8f8f8');
	g.setAttribute('stroke-linecap', 'square');

	g.appendChild(createLine(2, 0, 0, 2));
	g.appendChild(createLine(4, 2, 2, 4));
	pattern.appendChild(rect);
	pattern.appendChild(g);
	defs.appendChild(pattern);

	pattern.setAttribute('id', '_ABSTRACT_RENDERER_ID_0');
	return defs;
}

var createLine = function(x1, y1, x2, y2) {
	var line = createSvgElement('line');
	line.setAttribute('x1', x1);
	line.setAttribute('y1', y1);
	line.setAttribute('x2', x2);
	line.setAttribute('y2', y2);
	return line;
}

var createDiv = function(id) { 
	var div = document.createElement('div');
	div.setAttribute('id', id);
	return div;
}