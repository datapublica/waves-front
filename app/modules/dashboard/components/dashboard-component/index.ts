import './dashboard-component.ts';
import {DashboardComponent} from "./dashboard-component";
import {MapChartComponent} from "./map-chart/map-chart";
import {LineChartComponent} from "./line-chart/line-chart";

angular.module('app.dashboard.components.dashboardcomponent', [])
.component('dashboardComponent', new DashboardComponent())
.component('mapChartComponent', new MapChartComponent())
.component('lineChartComponent', new LineChartComponent());
