angular.module('jirasic').controller('Display', ['dataService', DisplayCtrl]);

function DisplayCtrl(dataService) {
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
    	width = 1200 - margin.left - margin.right,
    	height = 370 - margin.top - margin.bottom;
	var parseDate = d3.time.format('%Y-%m-%d').parse;

    // create a svg container
	var svg = d3.select("body")
	    .append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	        .attr("transform", 
	              "translate(" + margin.left + "," + margin.top + ")");

	var items = dataService.roundDates(data);
	var created = d3.nest().key(function(d){return d.created}).sortKeys(d3.ascending).entries(items);
	created = _.map(created, function(c) { return {date: parseDate(c.key), count: c.values.length}});

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom").ticks(7);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var valueline = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.count); });

	x.domain(d3.extent(created, function(d) { return d.date; }));
	y.domain(d3.extent(created, function(d) { return d.count; }));

	svg.append("path")
        .attr("class", "line")
        .attr("stroke", "blue")
        .attr("d", valueline(created));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}