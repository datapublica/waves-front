import {directive} from "../../../../../decorators/directive";

import './widget-core.scss';
import {Visualisation} from "../../../../../model/Visualisation";

interface WidgetCoreScope extends ng.IScope
{
    widgetConfig: Visualisation<any>;
    widgetName: string;
}

@directive()
export class WidgetCore implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public template: any;
    
    private $scope;
    
    constructor() {
        
        this.scope = {
            widgetConfig: '=',
            latestEntry: '=',
            sensors: '=',
            widgetId: '='
        };
        
        this.template = <string>require('./widget-core.html');
        this.link = ($scope: WidgetCoreScope): void => {
            $scope.widgetName = $scope.widgetConfig.config.name;
        }
    }
}