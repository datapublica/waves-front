/**
 * Homepage Component
 */

/**
 * Internal deps
 */
import {MonitoringController} from './MonitoringController'
import {config as MonitoringRouting} from './MonitoringRouting'

/**
 * Stylesheet
 */
angular.module('app.homepage', ["ui.router"])
    .config(MonitoringRouting)
    .controller('MonitoringController', MonitoringController);
