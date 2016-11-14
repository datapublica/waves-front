import {SectorService} from "../../services/SectorService";
/**
 * ui-router s1i state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {
    
    'ngInject'; //needed when directly exporting a class or function
    
    $stateProvider.state('main.s1i', {
        url: '/s1i?unit',
        template: <string>require('./s1i.html'),
        controller: 'S1iController',
        controllerAs: 'S1i',
        resolve: {
            context : function (SectorService: SectorService) {
                return SectorService.getS1iContext();
            },
            data : function (SectorService: SectorService) {
                return SectorService.getS1iData();
            }
        }
    });
}