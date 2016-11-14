/**
 * ui-router main state
 * this is an abstract state, the user will always directly access a sub-state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {
    
    'ngInject'; //needed when directly exporting a class or function
    
    $stateProvider.state('main', {
        abstract: true,
        template: <string>require('./main.html'),
        controller: 'MainController',
        controllerAs: 'Main'
    });
}