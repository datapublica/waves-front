var N3Parser:any = require('rdf-parser-n3');
var rdf = <RDF>require("rdf");


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
                template: <string>require('./monitoring.html'),
                controller: 'MonitoringController',
                controllerAs: 'Monitoring',
                resolve: {
                    graph: () => {
                        var graph = new rdf.Graph();
                        return N3Parser.process(require("../../assets/data/topo.trig"), (t) => graph.add(t)).then(function() {
                            return graph;
                        });
                    }
                }
            }
        }
    });
}