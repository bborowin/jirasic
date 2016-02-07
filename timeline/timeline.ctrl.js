angular.module('jirasic')
    .controller('TimelineCtrl', ['dataService', 'canvasService', TimelineCtrl]);

function TimelineCtrl(dataService, canvasService) {
    var timeline = this;
    var svg = d3.select('svg');

    this.plot = function(data) {
      var items = dataService.prepareData(data);
      var m = 15;

      timeline.scales.x.domain(d3.extent(items, function(d) { return d.date; }));
      timeline.scales.y.domain(d3.extent(items, function(d) { return m * d.index; }));

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + timeline.height + ")")
          .call(timeline.axes.x);

      svg.append("g")
          .attr("class", "y axis")
          .call(timeline.axes.y);

      svg.selectAll('line')
         .data(items).enter()
         .append('rect')
         .attr('x', function(d) { return timeline.scales.x(d.date); })
         .attr('width', function(d) { return timeline.scales.x(d.end) - timeline.scales.x(d.date); })
         .attr('y', function(d) { return timeline.scales.y(m * d.index); })
         .attr('height', function(d) { return timeline.scales.y(m * d.index) - timeline.scales.y(m * (d.index+0.35)); })
         .attr('stroke', '#555555')
         .attr('stroke-width', 1);
    };

    canvasService.makeAxes(timeline);
    dataService.fetchData('data/issues.list.json').then(function(response) {
      if (response.status === 200) {
        timeline.plot(response.data);
      }
    });
}