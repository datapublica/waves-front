
/**
 * The main controller for the app. The controller:
 * Display the tabs and loads the correct ui-view based on the routing
 */
export class MainController {
    public goToState: Function;
    
    constructor($state: ng.ui.IStateService) {
        "ngInject";
        var ctrl = this;
        ctrl.goToState = function(state: string) {
            $state.go('main.'+state);
        }
    }
}