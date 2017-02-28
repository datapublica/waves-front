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
        chartConfig: '=',
        cancel: '&',
        configCreated: '&'
    };
    public controllerAs: string = 'Line';
    
    public controller: Function = ($scope: LineChartComponentScope, SectorService:SectorService): void => {
        'ngInject';
        let ctrl = $scope.Line;
    
        ctrl.metrics = SectorService.getUnits();
        
        ctrl.toggleSettings = (serie) => {
            ctrl.openedSettings = ctrl.openedSettings === serie ? null : serie;
        };
        
        if(angular.isDefined(ctrl.chartConfig) && angular.isDefined(ctrl.chartConfig.series)) {
            // modifying existing series
            let existingSeries = angular.copy(ctrl.chartConfig.series);
            existingSeries.forEach(s => {
               s.sensor = ctrl.sensors.filter(sensor => sensor['@id'] === s.sensor['@id'])[0];
               s.metric = ctrl.metrics.filter(metric => metric.unit === s.metric.unit)[0];
            });
            ctrl.series = existingSeries;
        } else {
            // series with default settings
            ctrl.series = <Serie[]> [
                {strokeWidth: 2, color: {hex:'#5BC0EB'}, lineType: 'full'},
                {strokeWidth: 2, color: {hex:'#9BC53D'}, lineType: 'full'},
                {strokeWidth: 2, color: {hex:'#E55934'}, lineType: 'full'}
            ];
        }
        
        ctrl.selectSeries = () => {
          let chartConfig = new LineChartConfig(null, ctrl.series.filter(s => s.sensor && s.metric));
          
          ctrl.configCreated({config: chartConfig});
        };
    }
}
