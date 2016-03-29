/// <reference path='../_all.ts' />

/**
 * Importing external libs
 */
import 'angular';
import 'angular-material';
import 'angular-ui-router';
require('angular-i18n/angular-locale_fr-fr.js');


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

import './assets/data/data.json';

/**
 * The main app module.
 */

module app {
    angular
        .module('app', [
            "ui.router",
            "ngMaterial",
            "app.components",
            "app.services",
            "app.homepage"
        ])
        .config(config)
        .config(palette)
        .run(run);
}