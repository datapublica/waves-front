/**
 * Main Component
 */

/**
 * Internal deps
 */
import {MainController} from './MainController'
import {config as MainRouting} from './MainRouting'

/**
 * Stylesheet
 */
angular.module('app.main', ["ui.router"])
.config(MainRouting)
.controller('MainController', MainController);
