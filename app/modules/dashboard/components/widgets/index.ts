import {LineChartWidget} from "./line-chart-widget/line-chart-widget";
import {MapChartWidget} from "./map-chart-widget/map-chart-widget";
import {WidgetCore} from "./widget-core/widget-core";

angular.module('app.dashboard.components.widgets', [])
.directive('widgetCore', <any>WidgetCore)
.component('mapChartWidget', new MapChartWidget())
.directive('lineChartWidget', <any>LineChartWidget);
