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

	go(data);
});