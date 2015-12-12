function go(data) {
   d3.select("body").selectAll("p")
      .data(data)
      .enter()
      .append("p")
      .text(function(d) { return d.resolved; })
      .style('color', function(d) {
         if (d.issuetype === 'Bug') {
            return 'red';
         } else {
            return 'black';
         }
      })
}