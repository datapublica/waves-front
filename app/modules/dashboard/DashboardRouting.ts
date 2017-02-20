/**
 * ui-router Dashboard state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {
    
    'ngInject'; //needed when directly exporting a class or function
    
    $stateProvider.state('main.dashboard', {
        url: '/dashboard',
        template: <string>require('./dashboard.html'),
        controller: 'DashboardController',
        controllerAs: 'Dashboard',
        resolve: {}
    });
}