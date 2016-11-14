/**
 * S1i Component
 */

/**
 * Internal deps
 */
import {S1iController} from './S1iController'
import {config as S1iRouting} from './S1iRouting'
import {PlotDirective} from "./plot/plot";

/**
 * Stylesheet
 */
import "./s1i.scss";

angular.module('app.s1i', ["ui.router"])
    .config(S1iRouting)
    .controller('S1iController', S1iController)
    .directive('plot', <any> PlotDirective);
