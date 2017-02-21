/**
 * Dashboard Component
 */

/**
 * Internal deps
 */
import {DashboardController} from './DashboardController'
import {config as DashboardRouting} from './DashboardRouting'
import './components';

/**
 * Stylesheet
 */
import "./dashboard.scss";

angular.module('app.dashboard', ['app.dashboard.components'])
.config(DashboardRouting)
.controller('DashboardController', DashboardController);