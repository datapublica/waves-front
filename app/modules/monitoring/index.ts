/**
 * Monitoring Component
 */

/**
 * Internal deps
 */
import {MonitoringController} from './MonitoringController'
import {config as MonitoringRouting} from './MonitoringRouting'
import {NetworkDirective} from "./directives/network/network";

/**
 * Stylesheet
 */
import "./monitoring.scss";

angular.module('app.monitoring', ["ui.router"])
    .config(MonitoringRouting)
    .controller('MonitoringController', MonitoringController)
    .directive('network', <any>NetworkDirective);
