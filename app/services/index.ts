import 'angular';

/**
 * App Services
 */
import {SectorService} from './SectorService.ts';
import {MonitoringService} from "./MonitoringService.ts";
import {StreamingService} from "./StreamingService.ts";

angular.module('app.services', [])
    .service('SectorService', SectorService)
    .service('MonitoringService', MonitoringService)
    .service('StreamingService', StreamingService);
