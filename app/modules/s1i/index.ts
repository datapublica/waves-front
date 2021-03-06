/**
 * S1i Component
 */

/**
 * Internal deps
 */
import {S1iController} from './S1iController'
import {config as S1iRouting} from './S1iRouting'
import {SensorsMapDirective} from "./directives/sensors-map/sensorsMap";
import {sensorLineChartDirective} from "./directives/sensor-line-chart/sensorLineChart";

/**
 * Leaflet
 */
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
/**
 * Stylesheet
 */
import "./s1i.scss";

angular.module('app.s1i', ["ui.router"])
    .config(S1iRouting)
    .controller('S1iController', S1iController)
    .directive('sensorLineChart', <any>sensorLineChartDirective)
    .directive('sensorsMap', <any>SensorsMapDirective);
