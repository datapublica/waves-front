import {LineChartConfig} from "../../../../../model/VisualisationConfigs/LineChartConfig";
/**
 * Line Chart Component
 */

import './line-chart.scss';
import {SectorService} from "../../../../../services/SectorService";

interface LineChartComponentScope extends ng.IScope
{
    Line: any // must match controllerAs
}

export class LineChartComponent implements ng.IComponentOptions {
    
    public template: any = <string>require('./line-chart.html');
    public restrict: string = "E";
    public bindings: Object = {
        sensors: '=',
        cancel: '&',
        configCreated: '&'
    };
    public controllerAs: string = 'Line';
    
    public controller: Function = ($scope: LineChartComponentScope, SectorService:SectorService): void => {
        'ngInject';
        let ctrl = $scope.Line;
    
        ctrl.metrics = SectorService.getUnits();
        
        ctrl.series = [];
        
        ctrl.addSerie = () => {
            ctrl.series.push();
        };
        
        ctrl.selectSeries = () => {
          let chartConfig = new LineChartConfig(null, ctrl.series);
          
          ctrl.configCreated({config: chartConfig});
        };
    }
}
