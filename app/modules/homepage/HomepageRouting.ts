import {HomeService} from "../../services/HomeService";
/**
 * ui-router homepage state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {

    'ngInject'; //needed when directly exporting a class or function

    $stateProvider.state('homepage', {
        url: '/',
        views: {
            "@": {
                template: <string>require('./homepage.html'),
                controller: 'HomepageController',
                controllerAs: 'Home',
                resolve: {
                    data: (HomeService) => {
                        return HomeService.getData();
                    }
                }
            }
        }
    });
}