import {SectorService} from "../../services/SectorService";
import {StorageService} from "../../services/StorageService";
/**
 * ui-router Dashboard state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {
    
    'ngInject'; //needed when directly exporting a class or function
    
    $stateProvider.state('main.dashboard', {
        url: '/',
        template: <string>require('./dashboard.html'),
        controller: 'DashboardController',
        controllerAs: 'Dashboard',
        resolve: {
            context : function (SectorService: SectorService) {
                return SectorService.getS1iContext();
            },
            data: (SectorService: SectorService) => {
                return SectorService.getS1iDataMock();
            },
            widgetsLocalStorage: (StorageService: StorageService) => {
                return StorageService.restoreWidgetConfigs();
            }
        }
    });
}