angular.module('jirasic').service('dataService', dataService);

function dataService() {
	return {
		getExtents: function (json) {
			var minDate, maxDate;
			var f = d3.time.format('%Y-%m-%dT%H:%M:%S.%L%Z')

			_.forEach(json(), function(j) {
				if (!minDate || minDate > j.created) {
					minDate = j.created;
				}
				if (!maxDate || maxDate < j.resolved) {
					maxDate = j.resolved;
				}
			});

			return [f.parse(minDate), f.parse(maxDate)];
		}
	};
}