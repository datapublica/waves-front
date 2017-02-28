/**
 * event-alert component. Will display a global alert (material toast) if the 'eventAlert' event is fired
 */

interface EventAlertComponentScope extends ng.IScope
{
    Alert: any // must match controllerAs
}

export class EventAlertComponent implements ng.IComponentOptions {
    
    public restrict:string = "E";
    public bindings:Object = {
        struct: '<'
    };
    public controllerAs:string = 'Alert';
    
    public controller:Function = ($rootScope: ng.IRootScopeService, $mdToast: ng.material.IToastService) :void => {
        'ngInject';
    
        $rootScope.$on('eventAlert', (event: ng.IAngularEvent, content: string) => {
            let toast = $mdToast.simple()
                .textContent(content)
                .position('top right')
                .action('Y ALLER')
                .highlightAction(true)
                .hideDelay(3000);
    
            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    // TODO clicked on alert content
                }
            });
        });
    };
}