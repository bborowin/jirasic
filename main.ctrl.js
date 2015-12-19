angular.module('jirasic').controller('Display', ['dataService', 'canvasService', DisplayCtrl]);

function DisplayCtrl(dataService, canvasService) {
	var parseDate = d3.time.format('%Y-%m-%d').parse;

	var params = {
		margin: {top: 30, right: 20, bottom: 30, left: 50},
		width: 1200,
		height: 2000
	};

	var c = canvasService.createCanvas('body', params);
	canvasService.makeAxes();

	var svg = c.svg;

	var items = dataService.roundDates(data);
	_.forEach(items, function(item, index) {
        item.date = parseDate(item.created);
        if (item.resolved) {
            item.end = parseDate(item.resolved);
        } else {
            item.end = item.date;
        }
		item.index = index;
	});

    var m = 15;
	c.scales.x.domain(d3.extent(items, function(d) { return d.date; }));
	c.scales.y.domain(d3.extent(items, function(d) { return m * d.index; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + c.height + ")")
        .call(c.axes.x);

    svg.append("g")
        .attr("class", "y axis")
        .call(c.axes.y);

    foo = svg.selectAll('line')
       .data(items).enter()
       .append('rect')
       .attr('x', function(d) { return c.scales.x(d.date); })
       .attr('width', function(d) { return c.scales.x(d.end) - c.scales.x(d.date); })
       .attr('y', function(d) { return c.scales.y(m * d.index); })
       .attr('height', function(d) { return c.scales.y(m * d.index) - c.scales.y(m * (d.index+0.35)); })
       // .attr('x1', function(d) { return c.scales.x(d.date); })
       // .attr('x2', function(d) { return c.scales.x(d.end); })
       // .attr('y1', function(d) { return c.scales.y(m * d.index); })
       // .attr('y2', function(d) { return c.scales.y(m * d.index); })
       .attr('stroke', '#555555')
       .attr('stroke-width', 1);
}