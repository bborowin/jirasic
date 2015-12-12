angular.module('jirasic').controller('Display', ['dataService', DisplayCtrl]);

function DisplayCtrl(dataService) {

	function go(data) {
	   d3.select('body').selectAll('p')
	      .data(data)
	      .enter()
	      .append('p')
	      .text(function(d) { return [d.created, d.resolved]; })
	      .style('color', function(d) {
	         if (d.issuetype === 'Bug') {
	            return 'red';
	         } else {
	            return 'black';
	         }
	      })
	}

	// go(data);

	var width = 1000,
		height = 650,
		padding = 20;

    // create a svg container
    var vis = d3.select('body').
        append('svg:svg')
        	.attr('width', width)
        	.attr('height', height)
	        .attr('class', 'graph-svg-component');

	var extents = dataService.getExtents(data);

	var xScale = d3.time.scale().domain(extents).range([padding, width - padding * 2]);
	var yScale = d3.scale.linear().domain([0, 10]).range([height - padding, padding]);

	var xAxis = d3.svg.axis().orient('bottom').scale(xScale);
	var yAxis = d3.svg.axis().orient('left').scale(yScale);

	vis.append('g').attr('transform', 'translate(0, ' + (height - padding) + ')').call(xAxis);
	vis.append('g').attr('transform', 'translate(' + padding + ', 0)').call(yAxis);
}