angular.module('jirasic').service('dataService', dataService);

function dataService() {
    this.parseDate = d3.time.format('%Y-%m-%d').parse;

	this.roundDates = function(items) {
		var f = d3.time.format('%Y-%m-%d');
		var dates = _.map(items(), function(item) {
			item.created = item.created.split('T')[0];
			if(item.resolved) {
				item.resolved = item.resolved.split('T')[0];
			}
			return item;
		});

		return dates;
	};
    
    this.prepareData = function(data) {
        var items = this.roundDates(data);
        _.forEach(items, function(item, index) {
            item.date = this.parseDate(item.created);
            if (item.resolved) {
                item.end = this.parseDate(item.resolved);
            } else {
                item.end = item.date;
            }
            item.index = index;
        }, this);
        return items;
    };
}