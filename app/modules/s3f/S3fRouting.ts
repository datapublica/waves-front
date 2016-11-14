/**
 * ui-router s3f state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {
    
    'ngInject'; //needed when directly exporting a class or function
    
    $stateProvider.state('main.s3f', {
        url: '/s3f',
        template: <string>require('./s3f.html'),
        controller: 'S3fController',
        controllerAs: 'S3f'
    });
}