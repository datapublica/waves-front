/**
 * App navbar
 */

import './navbar.scss'

interface NavbarComponentScope extends ng.IScope
{
    Navbar: any // must match controllerAs
}

export class NavbarComponent implements ng.IComponentOptions {

    public template:any = <string>require('./navbar.html');
    public restrict:string = "E";
    public bindings:Object = {
        struct: '<'
    };
    public controllerAs:string = 'Navbar';

    public controller:Function = ($scope: NavbarComponentScope) :void => {
        'ngInject';
        var ctrl = $scope.Navbar;
    };
}