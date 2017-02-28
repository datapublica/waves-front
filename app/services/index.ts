import 'angular';

/**
 * App Services
 */
import {SectorService} from './SectorService';
import {MonitoringService} from "./MonitoringService";
import {StreamingService} from "./StreamingService";
import {StorageService} from "./StorageService";

angular.module('app.services', [])
    .service('SectorService', SectorService)
    .service('MonitoringService', MonitoringService)
    .service('StorageService', StorageService)
    .service('StreamingService', StreamingService);
