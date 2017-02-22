import {MapChartConfig} from "../../../../../model/VisualisationConfigs/MapChartConfig";
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
        cancel: '&',
        configCreated: '&'
    };
    
    public controllerAs: string = 'Map';
    
    public controller: Function = ($scope: MapChartComponentScope): void => {
        'ngInject';
        let ctrl = $scope.Map;
    
        ctrl.availableMetrics = [
            {
                name: 'Metric1'
            },
            {
                name: 'Metric2'
            },
            {
                name: 'Metric3'
            },
            {
                name: 'Metric4'
            },
            {
                name: 'Metric5'
            }
        ];
    
        ctrl.selectMetrics = () => {
            let chartConfig = new MapChartConfig(null, ctrl.position, ctrl.color, ctrl.size);
            ctrl.configCreated({config: chartConfig});
        };
    }
}