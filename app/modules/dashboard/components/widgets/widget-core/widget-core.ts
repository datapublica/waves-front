import {directive} from "../../../../../decorators/directive";

import './widget-core.scss';
import {Visualisation} from "../../../../../model/Visualisation";

interface WidgetCoreScope extends ng.IScope
{
    deleteWidget: Function;
    widgetConfig: Visualisation<any>;
    widgetName: string;
}

@directive()
export class WidgetCore implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public template: any;
    
    constructor() {
        
        this.scope = {
            widgetConfig: '=',
            latestEntry: '=',
            sensors: '=',
            widgetId: '@',
            modifyWidget: '&',
            deleteWidget: '&'
        };
        
        this.template = <string>require('./widget-core.html');
        this.link = ($scope: WidgetCoreScope): void => {
            $scope.widgetName = $scope.widgetConfig.config.name;
        }
    }
}