import {MonitoringService} from "../../services/MonitoringService";


/**
 * ui-router Monitoring state
 * @param $stateProvider
 * @param MonitoringService
 */

export function config($stateProvider: ng.ui.IStateProvider): void {

    'ngInject'; //needed when directly exporting a class or function

    $stateProvider.state('main.monitoring', {
        url: '/overview',
        template: <string>require('./monitoring.html'),
        controller: 'MonitoringController',
        controllerAs: 'Monitoring',
        resolve: {
            graph: (MonitoringService: MonitoringService) => {
                return MonitoringService.getNetworkGraphMock();
            },
            metricUnits: (MonitoringService: MonitoringService) => {
                return MonitoringService.getMetricsUnits();
            }
        }
    });
}