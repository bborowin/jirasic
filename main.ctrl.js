angular.module('jirasic').controller('display', function() {

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

    // create a svg container
    var vis = d3.select("body").
        append("svg:svg")
	        .attr("class", "graph-svg-component");
});