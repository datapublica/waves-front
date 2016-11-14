/**
 * Monitoring Component
 */

/**
 * Internal deps
 */
import {MonitoringController} from './MonitoringController'
import {config as MonitoringRouting} from './MonitoringRouting'

/**
 * Stylesheet
 */
angular.module('app.monitoring', ["ui.router"])
    .config(MonitoringRouting)
    .controller('MonitoringController', MonitoringController);
