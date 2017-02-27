import {LineChartConfig, Serie} from "../../../../../model/VisualisationConfigs/LineChartConfig";
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
        
        // series with default colors
        ctrl.series = <Serie[]>[
            {strokeWidth: 1, color: {hex:'#5BC0EB'}, lineType: 'full'},
            {strokeWidth: 1, color: {hex:'#9BC53D'}, lineType: 'full'},
            {strokeWidth: 1, color: {hex:'#E55934'}, lineType: 'full'}
        ];
        
        ctrl.selectSeries = () => {
          let chartConfig = new LineChartConfig(null, ctrl.series.filter(s => s.sensor && s.metric));
          
          ctrl.configCreated({config: chartConfig});
        };
    }
}
