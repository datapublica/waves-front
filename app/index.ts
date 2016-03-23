/// <reference path='../_all.ts' />

/**
 * Importing external libs
 */
import 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'angular-websocket/dist/angular-websocket.js';

/**
 * Importing external stylesheets
 */
import 'angular-material/angular-material.css';

/**
 * Importing internal components
 */
import {config} from './config/core/coreConfig'
import {run} from './config/core/coreRun'
import {palette} from './config/material/palette'
import './modules/homepage/index';
import './services';
import './components';

/**
 * The main app module.
 */

module app {
    angular
        .module('app', [
            "ui.router",
            "ngMaterial",
            "ngWebSocket",
            "app.components",
            "app.services",
            "app.homepage"
        ])
        .config(config)
        .config(palette)
        .run(run);
}