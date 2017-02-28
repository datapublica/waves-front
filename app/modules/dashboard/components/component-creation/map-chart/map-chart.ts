import {MapChartConfig} from "../../../../../model/VisualisationConfigs/MapChartConfig";
import {SectorService} from "../../../../../services/SectorService";

/**
 * Map Chart Component
 */

import './map-chart.scss';

interface MapChartComponentScope extends ng.IScope
{
    Map: any // must match controllerAs
}

export class MapChartComponent implements ng.IComponentOptions {
    
    public template: any = <string>require('./map-chart.html');
    public restrict: string = "E";
    public bindings: Object = {
        chartConfig: '=',
        cancel: '&',
        configCreated: '&'
    };
    
    public controllerAs: string = 'Map';
    
    public controller: Function = ($scope: MapChartComponentScope, SectorService: SectorService): void => {
        'ngInject';
        let ctrl = $scope.Map;
        ctrl.units = SectorService.getUnits();
    
        ctrl.availableMetrics = ['Value', 'Diff'];
    
        if(angular.isDefined(ctrl.chartConfig)) {
            // modyfing an existing map
            ctrl.unit = ctrl.units.filter(u => u.unit === ctrl.chartConfig.unit.unit)[0];
            ctrl.color = angular.copy(ctrl.chartConfig.color);
            ctrl.size = angular.copy(ctrl.chartConfig.size);
        
        }
        
        ctrl.selectMetrics = () => {
            let chartConfig = new MapChartConfig(null, ctrl.unit, ctrl.color, ctrl.size);
            ctrl.configCreated({config: chartConfig});
        };
    }
}