import {directive} from "../../../../../decorators/directive";
import {Visualisation} from "../../../../../model/Visualisation";
import {MapChartConfig} from "../../../../../model/VisualisationConfigs/MapChartConfig";

import './map-chart-widget.scss';

interface MapChartWidgetScope extends ng.IScope
{
    widgetName: string;
    widgetConfig: Visualisation<MapChartConfig>;
}

@directive()
export class MapChartWidget implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public template: any;
    
    private $scope;
    
    constructor() {
        
        this.scope = {
            widgetConfig: '='
        };
    
        this.template = <string>require('./map-chart-widget.html');
        this.link = ($scope: MapChartWidgetScope, element): void => {
            console.log($scope.widgetConfig);
            $scope.widgetName = $scope.widgetConfig.config.name;
        }
    }
}