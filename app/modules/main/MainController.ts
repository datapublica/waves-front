
/**
 * The main controller for the app. The controller:
 * Display the tabs and loads the correct ui-view based on the routing
 */
export class MainController {
    public goToState: Function;
    public activeTab: string;
    
    constructor($state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $interval: ng.IIntervalService) {
        "ngInject";
        let ctrl = this;
        
        ctrl.activeTab = $state.current.name;
    
        ctrl.goToState = function(state: string) {
            $state.go('main.'+state);
        };
        
        // Mockup event alerts
        $interval(() => {
            $rootScope.$broadcast('eventAlert', 'Il y a une alerte !')
        }, 8000)
    }
}