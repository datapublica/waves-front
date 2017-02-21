/**
 * App navbar
 */

import './dashboard-component.scss';
import {VisualisationType, FullType} from "../../../../model/VisualisationType";

interface DashboardComponentScope extends ng.IScope
{
    Component: any // must match controllerAs
}

export class DashboardComponent implements ng.IComponentOptions {
    
    public template:any = <string>require('./dashboard-component.html');
    public restrict:string = "E";
    public bindings:Object = {
    };
    public controllerAs:string = 'Component';
    
    public controller:Function = ($scope: DashboardComponentScope) :void => {
        'ngInject';
        let ctrl = $scope.Component;
        
        ctrl.initStep = 0;
        
        let types: FullType[] = VisualisationType.getTypes();

        ctrl.types = types;
        
        ctrl.initNew = () => {
            ctrl.initStep = 1;
        }
    };
}
