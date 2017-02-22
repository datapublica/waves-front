import {directive} from "../../../../../decorators/directive";
import {Visualisation} from "../../../../../model/Visualisation";
import {LineChartConfig} from "../../../../../model/VisualisationConfigs/LineChartConfig";

import './line-chart-widget.scss';

interface LineChartWidgetScope extends ng.IScope
{
    widgetConfig: Visualisation<LineChartConfig>;
}

@directive()
export class LineChartWidget implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public template: any;
    
    private $scope;
    
    constructor() {
        
        this.scope = {
            widgetConfig: '='
        };
    
        this.template = <string>require('./line-chart-widget.html');
        this.link = ($scope: LineChartWidgetScope, element): void => {
            console.log($scope.widgetConfig);
        }
    }
}