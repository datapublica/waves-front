import {NavbarComponent} from "./navbar/navbar";
import {PlotDirective} from "./plot/plot";
/**
 Global components for the app
 **/

angular.module('app.components', [])
    .component('navbar', new NavbarComponent())
    .directive('plot', <any> PlotDirective);