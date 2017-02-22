import {LineChartWidget} from "./line-chart-widget/line-chart-widget";
import {MapChartWidget} from "./map-chart-widget/map-chart-widget";

angular.module('app.dashboard.components.widgets', [])
.directive('mapChartWidget', <any>MapChartWidget)
.directive('lineChartWidget', <any>LineChartWidget);
