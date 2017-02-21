/**
 * Component to add a new widget (will load a specific template based on the type of the widget)
 */

import './dashboard-component.scss';
import {VisualisationType, FullType} from "../../../../model/VisualisationType";
import {Visualisation} from "../../../../model/Visualisation";
import {LineChartConfig} from "../../../../model/VisualisationConfigs/LineChartConfig";
import {Stream} from "../../../../model/Stream";

interface DashboardComponentScope extends ng.IScope
{
    Component: any // must match controllerAs
}

export class DashboardComponent implements ng.IComponentOptions {
    
    public template:any = <string>require('./dashboard-component.html');
    public restrict:string = "E";
    public bindings:Object = {};
    public controllerAs:string = 'Component';
    
    public controller:Function = ($scope: DashboardComponentScope, $log:angular.ILogService) :void => {
        'ngInject';
        let ctrl = $scope.Component;
        
        ctrl.initStep = 0;
        
        let types: FullType[] = VisualisationType.getTypes();
        let streams: Stream[] = [ new Stream('Waves:Stream', "S1-I", 54)];

        ctrl.types = types;
        ctrl.streams = streams;
    
        ctrl.initNew = () => {
            ctrl.initStep = 1;
        };
        
        ctrl.selectType = (type: FullType) => {
            if(type.id && VisualisationType.isValid(type.id)) {
                ctrl.initStep = 2;
                ctrl.componentType = type.id;
            } else {
                $log.error(JSON.stringify(type) + ' is not a valid type.');
            }
        };
        
        ctrl.selectStream = () => {
            ctrl.initStep = 3;
        };
        
        ctrl.configCreated = (config) => {
            ctrl.chartConfig = config;
            ctrl.initStep = 4;
        };
        
        ctrl.displayWidget = () => {
            ctrl.chartConfig._name = ctrl.componentName;
            let componentConfig: Visualisation<LineChartConfig> = new Visualisation<LineChartConfig>(ctrl.componentType, ctrl.componentStream, ctrl.chartConfig);
    
            console.log(componentConfig);
        }
    };
}
