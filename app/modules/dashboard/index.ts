/**
 * Dashboard Component
 */

/**
 * Internal deps
 */
import {DashboardController} from './DashboardController'
import {config as DashboardRouting} from './DashboardRouting'

/**
 * Stylesheet
 */
import "./dashboard.scss";

angular.module('app.dashboard', [])
.config(DashboardRouting)
.controller('DashboardController', DashboardController);