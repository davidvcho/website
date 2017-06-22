var svgNS = "http://www.w3.org/2000/svg";  

window.onload = function() {
	init();
}

var init = function() {
	var activity = document.getElementById('activity');
	activity.appendChild(createSvg(2015));
	activity.appendChild(createSvg(2016));
	activity.appendChild(createSvg(2017));
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

	var dates = createGroup();
	var date = new Date(year, 0, 1);
	var week = 0;
	while (date.getFullYear() == year) {
		dates.appendChild(createDate(date.getDay(), week));
		date.setDate(date.getDate() + 1);
		if (date.getDay() == 0) {
			week++;
		}
	}

	var paths = createGroup();
	for (var i = 0; i < 12; i++) {
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

var createDate = function(row, col) {
	var rect = document.createElementNS(svgNS, 'rect');
	rect.setAttribute('width', 18);
	rect.setAttribute('height', 18);
	rect.setAttribute('stroke', '#ffffff');
	rect.setAttribute('stroke-width', 1);
	// rect.setAttribute('fill', 'none');
	rect.setAttribute('fill', '#add8e6');
	rect.setAttribute('x', getX(col));
	rect.setAttribute('y', getY(row));
	rect.setAttribute('style', 'fill: url(#_ABSTRACT_RENDERER_ID_0)');
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
	// console.log(pathString);

	last = new Date(year, month + 1, 1);
	last.setDate(last.getDate() - 1);
	
	if (last.getDay() != 6) {
		pathString += vertical(getY(last.getDay() + 1)) + horizontal(getX(weeks + 2));
	}

	pathString += vertical(getY(0)) + end();

	var path = createSvgElement('path');
	path.setAttribute('stroke', '#c9c9c9');
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