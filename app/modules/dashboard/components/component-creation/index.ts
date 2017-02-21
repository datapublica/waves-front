import './component-creation.ts';
import {CreationComponent} from "./component-creation";
import {MapChartComponent} from "./map-chart/map-chart";
import {LineChartComponent} from "./line-chart/line-chart";

angular.module('app.dashboard.components.creation', [])
.component('componentCreation', new CreationComponent())
.component('mapChartComponent', new MapChartComponent())
.component('lineChartComponent', new LineChartComponent());
