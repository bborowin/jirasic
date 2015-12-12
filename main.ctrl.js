angular.module('jirasic').controller('Display', ['dataService', function(dataService) {

	function go(data) {
	   d3.select("body").selectAll("p")
	      .data(data)
	      .enter()
	      .append("p")
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
		height = 650;

    // create a svg container
    var vis = d3.select("body").
        append("svg:svg")
        	.attr("width", width)
        	.attr("height", height)
	        .attr("class", "graph-svg-component");

	var jiras = dataService.prepareData(data);
	
}]);