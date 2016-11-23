import 'angular';

/**
 * App Services
 */
import {SectorService} from './SectorService.ts';
import {MonitoringService} from "./MonitoringService.ts";

angular.module('app.services', [])
    .service('SectorService', SectorService)
    .service('MonitoringService', MonitoringService);
