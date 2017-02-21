/**
 * Map Chart Component
 */

interface MapChartComponentScope extends ng.IScope
{
    Map: any // must match controllerAs
}

export class MapChartComponent implements ng.IComponentOptions {
    
    public template: any = <string>require('./map-chart.html');
    public restrict: string = "E";
    public bindings: Object = {
        configCreated: '&'
    };
    
    public controllerAs: string = 'Map';
    
    public controller: Function = ($scope: MapChartComponentScope): void => {
        'ngInject';
        let ctrl = $scope.Map;
    }
}