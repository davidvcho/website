/*******************************************************************************
 *                                                                             *
 *                                   STRING                                    *
 *                                                                             *
 ******************************************************************************/

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

/*******************************************************************************
 *                                                                             *
 *                                    NODE                                     *
 *                                                                             *
 ******************************************************************************/

/** 
 * Adds element and returns parent node. Useful for chaining multiple appends 
 * or hierarchical appends.
 */
Node.prototype.add = function(element) {
	this.appendChild(element);
	return this;
};

/** 
 * Adds an attribute to the element and returns it. Useful for chaining multiple 
 * setAttributes.
 */
Node.prototype.attr = function(name, value) {
	this.setAttribute(name, value);
	return this;
};

/** Sets element id and returns the element. */
Node.prototype.setId = function(id) {
    return this.attr('id', id);
};

/** Adds a css class and returns the element. */
Node.prototype.addCssClass = function(className) {
    this.classList.add(className);
    return this;
};

Node.prototype.setText = function(text) {
    this.innerHTML = text;
    return this;
};

Node.prototype.removeLastChild = function() {
    this.removeChild(this.lastChild);
};

Node.prototype.addStyle = function(name, value) {
    this.style.setProperty(name, value);
    return this;
};

/*******************************************************************************
 *                                                                             *
 *                                    DATE                                     *
 *                                                                             *
 ******************************************************************************/

Date.prototype.incrementDays = function(opt_days) {
    opt_days != 0 && this.setDate(this.getDate() + (opt_days || 1));
    return this;
};

Date.prototype.MS_PER_DAY = 1000 * 3600 * 24;

/** Returns the date's week number. The first day of the year is week 0. */
Date.prototype.getWeek = function() {
    var firstSunday = new Date(this.getFullYear(), 0).roundUp();
    var thisSunday = this.roundUp();
    return Math.ceil(
        (thisSunday.getTime() - firstSunday.getTime()) / this.MS_PER_DAY) / 7;
};

/** Returns the most recent Sunday. */
Date.prototype.roundUp = function() {
    return new Date(this).incrementDays(-this.getDay());
};

/** Returns the next Saturday. */
Date.prototype.roundDown = function() {
    return new Date(this).incrementDays(6 - this.getDay());
};

Date.prototype.toSlashString = function() {
    return '{0}/{1}/{2}'
        .format(this.getMonth() + 1, this.getDate(), this.getFullYear() % 100);
};

Date.prototype.isSunday = function() {
    return this.getDay() == 0;
};

Date.prototype.isSaturday = function() {
    return this.getDay() == 6;
};

Date.prototype.isEquals = function(that) {
    return this.toString() == that.toString();
};

/** Returns whether this month/year has passed already. */
Date.prototype.occurred = function() {
    return this.getFullYear() < new Date().getFullYear() || 
        this.getMonth() <= new Date().getMonth();
};

/*******************************************************************************
 *                                                                             *
 *                                  ELEMENT                                    *
 *                                                                             *
 ******************************************************************************/

/** Helper class to create HTML elements. */
function Element() {};

Element.prototype = {
    svgNS_: 'http://www.w3.org/2000/svg',
	createDiv: function(id) {
		return document.createElement('div').setId(id);
	},
	createSvgElement_: function(tagName) {
		return document.createElementNS(this.svgNS_, tagName);
	},
	createSvg: function(width, height) {
		return this.createSvgElement_('svg')
            .attr('width', width)
            .attr('height', height);
	},
	createSvgLine: function(x1, y1, x2, y2) {
		return this.createSvgElement_('line')
			.attr('x1', x1)
			.attr('y1', y1)
			.attr('x2', x2)
			.attr('y2', y2);
	},
	createSvgText: function() {
        return this.createSvgElement_('text')
            .attr('text-anchor', 'middle')
            .addCssClass('svg-text');
	},
	createSvgGroup: function() {
		return this.createSvgElement_('g');
	},
	createSvgRect: function() {
		return this.createSvgElement_('rect');
	},
	createSvgPath: function() {
		return this.createSvgElement_('path');
	},
	createSvgDefs: function() {
		return this.createSvgElement_('defs');
	},
	createSvgPattern: function() {
		return this.createSvgElement_('pattern');
	},
};

/*******************************************************************************
 *                                                                             *
 *                                    PATH                                     *
 *                                                                             *
 ******************************************************************************/

function Path() {
    this.path_ = '';
};

Path.prototype = {
    move_: function(pathString) {
        this.path_ += pathString;
        return this;
    },
    startAt: function(x, y) {
        return this.move_('M ' + x + ' ' + y + ' ');
    },
    vertical: function(y) {
        return this.move_('V ' + y + ' ');
    },
    horizontal: function(x) {
        return this.move_('H ' + x + ' ');
    },
    end: function() {
        return this.move_('Z');
    },
    toString: function() {
        return this.path_;
    },
};

/*******************************************************************************
 *                                                                             *
 *                                  CALENDAR                                   *
 *                                                                             *
 ******************************************************************************/

/** */
function Calendar(year) {
    this.year_ = year;
};

Calendar.prototype = {
    DAYS_: 'SMTWTFS',
    MONTHS_: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    toNode: function() {
        return element.createDiv(this.year_).add(this.createCalendar_());
    },
    createCalendar_: function() {
        var labels = element.createSvgGroup().add(this.createYearLabel_());

        if (this.year_ == 2015) { 
            for (var i = 0; i < this.MONTHS_.length; i++) {
                labels.add(this.createMonthLabel_(this.MONTHS_[i], i));
            }
        }

        for (var i = 0; i < this.DAYS_.length; i++) {
            labels.add(this.createDayLabel_(this.DAYS_[i], 30.2 + i * 18));
        }

        var dates = element.createSvgGroup();
        var date = new Date(this.year_, 0 /** month */);
        do {
            dates.add(this.createDateSquare_(date, dates));
        } while (date.incrementDays().getFullYear() == this.year_);

        dates.onmouseleave = function() {
            if (getElementById('hover-rect')) {
                dates.removeLastChild();
                getElementById(this.year_).removeLastChild();
            }
        }.bind(this);

        var monthOutlines = element.createSvgGroup();
        for (var i = 11; i >= 0; i--) {
            monthOutlines.add(this.createMonthOutline_(i)); 
        }

        return element.createSvg('1118', '145')
           .add(this.createReferenceElements_())
           .add(labels)
           .add(dates)
           .add(monthOutlines);
    },
    createTextElement_: function(text, className, x, y) {
        return element.createSvgText()
            .addCssClass(className)
            .setText(text)
            .attr('x', x)
            .attr('y', y);
    },
    createYearLabel_: function() {
        return this.createTextElement_(this.year_, 'svg-text-year', 91, 122);
    },
    createMonthLabel_: function(month, x) {
        return this.createTextElement_(
            month, 'svg-text-month', 115 + 79 * x, 12);
    },
    createDayLabel_: function(day, y) {
        return this.createTextElement_(day, 'svg-text-day', 61.5, y);
    },
    createDateSquare_: function(date, container) {
        // Prevent date from changing within the scope of this function. 
        date = new Date(date);

        var x = this.getX_(date.getWeek());
        var y = this.getY_(date.getDay());

        var isActive = dateSet.has(date.toSlashString());

        var rect = element.createSvgRect()
           .addCssClass('svg-text-date')
           .attr('width', 18)
           .attr('height', 18)
           .attr('stroke', '#ffffff')
           .attr('stroke-width', 1)
           .attr('fill', isActive ? '#c9dcfb' : 'url(#_ABSTRACT_RENDERER_ID_0)')
           .attr('x', x)
           .attr('y', y);

        rect.onmouseenter = function() {
            // Remove existing hovering popups.
            if (getElementById('hover-rect')) {
                container.removeLastChild();
                getElementById(this.year_).removeLastChild();
            }

            // Add highlighted box.
            container.add(
                element.createSvgRect() 
                    .setId('hover-rect')
                    .attr('width', 18)
                    .attr('height', 18)
                    .attr('fill', isActive ? 'transparent' : '#fff')
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2)
                    .attr('x', x)
                    .attr('y', y));

            var left = x + 68 + 
                getElementById('activity').getBoundingClientRect().left;
            var top = y + 89 + 155 * (this.year_ - 2015) +
                70 * (this.year_ == 2015 && date.getDay() < 2);

            getElementById(this.year_).add(
                document.createElement('div')
                    .setId('activity-date')
                    .setText(date.toDateString().substring(4))
                    .addStyle('left', left + 'px')
                    .addStyle('top', top + 'px'));
        }.bind(this);
        return rect;
    },
    createMonthOutline_: function(month) {
        var date = new Date(this.year_, month);
        var week = date.getWeek();

        var x = this.getX_(week);
        var y = this.getY_(date.getDay());
        
        var path = new Path();
        date.isSunday() ? // Draw _| if first date isn't Sunday.
            path.startAt(x, y) : 
            path.startAt(
                this.getX_(week + 1), 
                this.getY_(0)).vertical(y).horizontal(x);

        // Draw down to bottom left corner.
        path.vertical(this.getY_(7));

        // Draw to bottom right corner, which is the last Saturday of the month.
        var lastSaturday = 
            new Date(this.year_, month + 1).roundUp().incrementDays(-1);
        path.horizontal(this.getX_(lastSaturday.getWeek() + 1));

        var lastDay = new Date(this.year_, month + 1).incrementDays(-1);
        if (!lastDay.isSaturday()) {
            // Draw Γ since we know this corner exists.
            path
                .vertical(this.getY_(lastDay.getDay() + 1))
                .horizontal(this.getX_(lastDay.getWeek() + 1));
        }

        // Draw up to top right corner.
        path.vertical(this.getY_(0)).end();

        return element.createSvgPath()
            .attr('stroke-width', 1)
            .attr('fill', 'none')
            .attr('d', path.toString())
            .attr(
                'stroke', 
                new Date(this.year_, month).occurred() ? '#000' : '#c9c9c9');
    },
    createReferenceElements_: function() {
        return element.createSvgDefs()
            .add(
                element.createSvgPattern()
                    .setId('_ABSTRACT_RENDERER_ID_0')
                    .attr('patternUnits', 'userSpaceOnUse')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', 6)
                    .attr('height', 6)
                    .attr('viewBox', '0 0 4 4')
                    .add(
                        element.createSvgRect()
                           .attr('fill', '#e8e8e8')
                           .attr('x', 0)
                           .attr('y', 0)
                           .attr('width', 4)
                           .attr('height', 4))
                    .add(
                        element.createSvgGroup()
                           .attr('stroke', '#f8f8f8')
                           .attr('stroke-linecap', 'square')
                           .add(element.createSvgLine(2, 0, 0, 2))
                           .add(element.createSvgLine(4, 2, 2, 4))));
    },
    /** Computes x coordinate of the square representing a date on this week. */
    getX_: function(week) {
        return 71 + 18 * week;
    },
    /** Computes y coordinate of the square representing a date on this day. */
    getY_: function(day) { 
        return 17 + 18 * day;
    },
};

var element = new Element();

var dateSet = new Set(['1/15/15','1/16/15','1/19/15','1/20/15','1/21/15','1/22/15','1/23/15','1/25/15','1/28/15','1/31/15','2/6/15','2/8/15','2/9/15','2/10/15','2/11/15','2/18/15','2/20/15','2/22/15','2/23/15','3/2/15','3/4/15','3/7/15','3/10/15','3/12/15','3/17/15','3/18/15','3/21/15','3/23/15','4/6/15','4/8/15','4/12/15','4/15/15','4/18/15','4/19/15','4/23/15','4/28/15','4/29/15','4/30/15','5/4/15','5/5/15','5/9/15','5/21/15','5/22/15','5/26/15','5/27/15','5/28/15','6/2/15','6/3/15','6/4/15','6/5/15','6/8/15','6/9/15','6/10/15','6/11/15','6/12/15','6/15/15','6/16/15','6/18/15','6/19/15','6/22/15','6/23/15','6/24/15','6/25/15','6/26/15','6/29/15','6/30/15','7/1/15','7/2/15','7/6/15','7/7/15','7/8/15','7/9/15','7/10/15','7/13/15','7/14/15','7/15/15','7/16/15','7/17/15','7/20/15','7/21/15','7/22/15','7/23/15','7/24/15','7/27/15','7/28/15','7/29/15','7/30/15','8/3/15','8/4/15','8/5/15','8/6/15','8/10/15','8/11/15','8/13/15','8/14/15','8/19/15','8/25/15','8/26/15','8/27/15','8/28/15','9/2/15','9/7/15','9/10/15','9/13/15','9/15/15','9/16/15','9/17/15','9/23/15','9/24/15','9/26/15','9/27/15','9/29/15','9/30/15','10/1/15','10/2/15','10/5/15','10/7/15','10/13/15','10/14/15','10/15/15','10/17/15','10/19/15','10/20/15','10/23/15','10/25/15','10/30/15','10/31/15','11/2/15','11/3/15','11/4/15','11/5/15','11/7/15','11/9/15','11/11/15','11/12/15','11/15/15','11/17/15','11/19/15','11/21/15','11/23/15','11/30/15','12/1/15','12/2/15','12/3/15','12/4/15','12/5/15','12/7/15','12/8/15','12/9/15','12/10/15','12/11/15','12/12/15','12/14/15','12/1/15','12/20/15','12/21/15','12/22/15','12/23/15','12/24/15','12/26/15','12/27/15','12/28/15','12/29/15','12/30/15','12/31/15','1/2/16','1/3/16','1/9/16','1/11/16','1/12/16','1/13/16','1/14/16','1/16/16','1/18/16','1/19/16','1/21/16','1/22/16','1/24/16','1/25/16','1/27/16','1/28/16','1/29/16','1/31/16','2/1/16','2/4/16','2/8/16','2/10/16','2/12/16','2/13/16','2/14/16','2/15/16','2/16/16','2/17/16','3/1/16','3/2/16','3/3/16','3/4/16','3/5/16','3/6/16','3/7/16','3/8/16','3/9/16','3/10/16','3/11/16','3/13/16','3/14/16','3/16/16','3/21/16','3/22/16','3/26/16','4/4/16','4/5/16','4/6/16','4/7/16','4/8/16','4/9/16','4/10/16','4/11/16','4/12/16','4/13/16','4/14/16','4/17/16','4/18/16','4/19/16','4/21/16','4/24/16','4/25/16','4/26/16','4/27/16','4/28/16','4/29/16','5/1/16','5/2/16','5/3/16','5/4/16','5/5/16','5/9/16','5/10/16','5/15/16','5/18/16','5/20/16','7/21/16','7/24/16','7/25/16','9/12/16','9/13/16','9/14/16','9/15/16','9/19/16','9/20/16','9/22/16','9/26/16','9/27/16','9/28/16','9/30/16','10/3/16','10/4/16','10/5/16','10/6/16','10/12/16','10/13/16','10/14/16','10/18/16','10/19/16','10/22/16','10/24/16','10/25/16','10/31/16','11/1/16','11/2/16','11/3/16','11/5/16','11/7/16','11/8/16','11/9/16','11/10/16','11/11/16','11/14/16','11/15/16','11/16/16','11/18/16','11/21/16','11/22/16','11/23/16','11/28/16','11/29/16','11/30/16','12/1/16','12/2/16','12/5/16','12/6/16','12/7/16','12/8/16','12/10/16','12/12/16','12/13/16','12/20/16','12/21/16','12/22/16','12/27/16','12/28/16','12/30/16','1/7/17','1/9/17','1/10/17','1/11/17','1/12/17','1/17/17','1/18/17','1/19/17','1/20/17','1/24/17','1/25/17','1/29/17','1/30/17','2/1/17','2/3/17','2/6/17','2/7/17','2/8/17','2/12/17','2/13/17','2/14/17','2/15/17','2/16/17','2/22/17','2/23/17','2/26/17','2/27/17','2/28/17','3/1/17','3/3/17','3/6/17','3/7/17','3/10/17','3/13/17','3/14/17','3/15/17','3/16/17','3/17/17','3/21/17','2/22/17','2/23/17','3/25/17','3/27/17','3/28/17','4/10/17','4/11/17','4/12/17','4/13/17','4/16/17','4/17/17','4/18/17','4/19/17','4/22/17','4/23/17','4/24/17','4/25/17','5/3/17','5/4/17','5/9/17','5/15/17','5/31/17','6/2/17','6/5/17','6/8/17','6/12/17','6/14/17','6/16/17','6/19/17']);

window.onload = function() {
	initActivityCalendar();
}

// TODO: Make activity calendar its own class.
var initActivityCalendar = function() {
    var yearRange = getYearRange();
	var activity = getElementById('activity');
	// TODO: Extract year start and end from set of dates.
	for (var i = yearRange[0]; i <= yearRange[1]; i++) {
        activity.add(new Calendar(i).toNode());
	}
}

var getElementById = function(id) {
    return document.getElementById(id);
};

var getYearRange = function() {
    var set = new Set();
    var re = /(\d{1,2})\/(\d{1,2})\/(\d{1,2})/;
    for (let item of dateSet) {
        set.add(re.exec(item)[3]);
    }
    var years = [...set].sort().map(year => '20' + year);
    return [years[0], years[years.length - 1]];
};



// TODO Create pie chart of days