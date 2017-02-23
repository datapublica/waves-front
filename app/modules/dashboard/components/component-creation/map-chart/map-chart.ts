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
        cancel: '&',
        configCreated: '&'
    };
    
    public controllerAs: string = 'Map';
    
    public controller: Function = ($scope: MapChartComponentScope, SectorService: SectorService): void => {
        'ngInject';
        let ctrl = $scope.Map;
    
        ctrl.units = SectorService.getUnits();
    
        ctrl.availableMetrics = ['Value', 'Diff'];
        
        ctrl.selectMetrics = () => {
            let chartConfig = new MapChartConfig(null, ctrl.unit, ctrl.color, ctrl.size);
            ctrl.configCreated({config: chartConfig});
        };
    }
}