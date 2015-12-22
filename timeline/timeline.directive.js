angular.module('jirasic')
    .directive('timeline', ['dataService', 'canvasService', Timeline]);

function Timeline() {
    return {
        restrict: 'E',
        templateUrl: 'timeline/timeline.html',
        replace: true,
        controller: 'TimelineCtrl',
        bindToController: true,
        controllerAs: 'timeline',
        scope: {
            width: '@',
            height: '@',
            marginTop: '@',
            marginRight: '@',
            marginBottom: '@',
            marginLeft: '@',
        }
    };
}