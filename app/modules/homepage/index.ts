/**
 * Homepage Component
 */

/**
 * Internal deps
 */
import {HomepageController} from './HomepageController'
import {config as HomepageRouting} from './HomepageRouting'
import {PlotDirective} from './components/plot/plot'

/**
 * Stylesheet
 */
import "./homepage.scss";

angular.module('app.homepage', ["ui.router"])
    .config(HomepageRouting)
    .controller('HomepageController', HomepageController)
    .directive('plot', <any> PlotDirective);
