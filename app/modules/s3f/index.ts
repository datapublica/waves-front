/**
 * S3f Component
 */

/**
 * Internal deps
 */
import {S3fController} from './S3fController'
import {config as S3fRouting} from './S3fRouting'
import {SensorsMapDirective} from "./directives/sensors-map/sensorsMap";

/**
 * Leaflet
 */
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../components/oms/oms.js';

/**
 * Stylesheet
 */
import "./s3f.scss";

angular.module('app.s3f', ["ui.router"])
    .config(S3fRouting)
    .controller('S3fController', S3fController)
    .directive('sensorsMap', <any>SensorsMapDirective);
