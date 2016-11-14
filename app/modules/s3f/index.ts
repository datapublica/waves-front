/**
 * S3f Component
 */

/**
 * Internal deps
 */
import {S3fController} from './S3fController'
import {config as S3fRouting} from './S3fRouting'
import {PlotDirective} from "./plot/plot";

/**
 * Stylesheet
 */
import "./s3f.scss";

angular.module('app.s3f', ["ui.router"])
    .config(S3fRouting)
    .controller('S3fController', S3fController)
    .directive('plot', <any> PlotDirective);
