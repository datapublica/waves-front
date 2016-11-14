var rdf: RDF = require("rdf-ext");

/**
 * The homepage controller for the app. The controller:
 * - display a <hello world> message
 */
export class MonitoringController {
    public data: any;
    public graph: Graph;
    streams: RDFNode[];
    filters: RDFNode[];

    constructor($scope: ng.IScope, graph: Graph) {
        "ngInject";
        var self = this;
        self.graph = graph;
        self.streams = graph.match(null, null, "http://www.waves-rsp.org/configuration#Stream").map(it => it.subject.nominalValue);
        self.filters = graph.match(null, null, "http://www.waves-rsp.org/configuration#Filter").map(it => it.subject.nominalValue);
    }
}