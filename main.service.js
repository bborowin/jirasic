angular.module('jirasic').service('dataService', function() {
	return {
		prepareData: function (json) {
			var items = _.map(json(), function(j) {
				return {
					created: j.created,
					resolved: j.resolved
				}
			});

			return items;
		}
	};
});