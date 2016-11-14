import 'angular';

/**
 * App Services
 */
import {SectorService} from './SectorService.ts';


angular.module('app.services', [])
    .service('SectorService', SectorService);
