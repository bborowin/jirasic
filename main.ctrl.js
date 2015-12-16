angular.module('jirasic').controller('Display', ['dataService', 'canvasService', DisplayCtrl]);

function DisplayCtrl(dataService, canvasService) {
	var parseDate = d3.time.format('%Y-%m-%d').parse;

	var params = {
		margin: {top: 30, right: 20, bottom: 30, left: 50},
		width: 1200,
		height: 370
	};

	var c = canvasService.createCanvas('body', params);
	canvasService.makeAxes();

	var svg = c.svg;

	var items = dataService.roundDates(data);
	var created = d3.nest().key(function(d){return d.created}).sortKeys(d3.ascending).entries(items);
	created = _.map(created, function(c) { return {date: parseDate(c.key), count: c.values.length}});

	var valueline = d3.svg.line()
	    .x(function(d) { return c.scales.x(d.date); })
	    .y(function(d) { return c.scales.y(d.count); });

	c.scales.x.domain(d3.extent(created, function(d) { return d.date; }));
	c.scales.y.domain(d3.extent(created, function(d) { return d.count; }));

	svg.append("path")
        .attr("class", "line")
        .attr("stroke", "blue")
        .attr("d", valueline(created));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + c.height + ")")
        .call(c.axes.x);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(c.axes.y);
}