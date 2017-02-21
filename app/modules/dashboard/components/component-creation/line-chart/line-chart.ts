import {LineChartConfig} from "../../../../../model/VisualisationConfigs/LineChartConfig";
/**
 * Line Chart Component
 */

interface LineChartComponentScope extends ng.IScope
{
    Line: any // must match controllerAs
}

export class LineChartComponent implements ng.IComponentOptions {
    
    public template: any = <string>require('./line-chart.html');
    public restrict: string = "E";
    public bindings: Object = {
        configCreated: '&'
    };
    public controllerAs: string = 'Line';
    
    public controller: Function = ($scope: LineChartComponentScope): void => {
        'ngInject';
        let ctrl = $scope.Line;
    
        ctrl.availableSeries = [
            {
                name: 'Serie1'
            },
            {
                name: 'Serie2'
            },
            {
                name: 'Serie3'
            },
            {
                name: 'Serie4'
            },
            {
                name: 'Serie5'
            },
            {
                name: 'Serie6'
            }
        ];
        
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
