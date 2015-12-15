angular.module('jirasic').service('dataService', dataService);

function dataService() {
	return {
		roundDates: function(items) {
			var f = d3.time.format('%Y-%m-%d');
			var dates = _.map(items(), function(item) {
				item.created = item.created.split('T')[0];
				if(item.resolved) {
					item.resolved = item.resolved.split('T')[0];
				}
				return item;
			});

			return dates;
		},
		parseDate: d3.time.format('%Y-%m-%d').parse
	};

}