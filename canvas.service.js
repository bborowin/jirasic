angular.module('jirasic').service('canvasService', canvasService);

function canvasService() {
	var c = this;
	c.scales = {},
	c.axes = {};

	c.makeAxes = function(ctrl) {
		ctrl.scales = {};
		ctrl.axes = {};

		ctrl.scales.x = d3.time.scale()
		    .range([0, ctrl.width]);

		ctrl.scales.y = d3.scale.linear()
		    .range([ctrl.height, 0]);

		ctrl.axes.x = d3.svg.axis()
		    .scale(ctrl.scales.x)
		    .orient("bottom").ticks(5);

		ctrl.axes.y = d3.svg.axis()
		    .scale(ctrl.scales.y)
		    .orient("left");
	};
}