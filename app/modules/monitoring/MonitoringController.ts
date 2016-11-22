var rdf: RDF = require("rdf");

let URI_WAVES = "http://www.waves-rsp.org/configuration#";
let URI_RDFS = "http://www.w3.org/2000/01/rdf-schema#";
let RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";

let resolveOne = function (g: Graph, property: string, mapping?: (RDFNode) => any): any {
    mapping = mapping || (x => x.toString());
    let res = g.match(null, property, null);
    if (res.length === 0) {
        return null;
    }
    return mapping(res[0].object);
};
let resolve = function (g: Graph, property: string, mapping?: (RDFNode) => any): Array<any> {
    mapping = mapping || (x => x.toString());
    return g.match(null, property, null).map(x => mapping(x.object));
};

class RDFObject {
    public uri: string;
    public path: string;

    constructor(node: RDFNode, objects: Object) {
        this.uri = node.toString();
        this.path = this.uri.replace(new RegExp("https?://[^/]*"), "");
        objects[this.uri] = this;
    }

    asNode(): any {
        return {
            "id": this.uri,
            "data": this
        }
    }

    toString(): string {
        return this.uri+"";
    }
}

export class Unit extends RDFObject {
    public unitReferences: string;
    public mappings: string;

    constructor(node: RDFNode, g: Graph, objects: Object) {
        super(node, objects);
        this.unitReferences = resolveOne(g, URI_WAVES+"unitReferences");
        this.mappings = resolveOne(g, URI_WAVES+"mappings");
    }
}

export class Converter extends RDFObject {
    public label: string;
    public model: string;
    public location: string;
    public unit: Unit;
    public query: string;

    constructor(node: RDFNode, g: Graph, all: Graph, objects: Object) {
        super(node, objects);
        this.label = resolveOne(g, URI_RDFS+"label");
        this.model = resolveOne(g, URI_WAVES+"model");
        this.location = resolveOne(g, URI_WAVES+"location");
        this.query = resolveOne(g, URI_WAVES+"query");
        this.unit = resolveOne(g, URI_WAVES+"unit", x => new Unit(x, new rdf.Graph(all.match(x, null, null)), objects));
    }

}

export class DataStream extends RDFObject {
    public label: string;
    public converter: Converter;
    public id: Number;

    constructor(node: RDFNode, g: Graph, all: Graph, objects: Object) {
        super(node, objects);
        this.label = resolveOne(g, URI_RDFS+"label");
        this.id = resolveOne(g, URI_WAVES+"id", x => parseInt(x.toString()));
        this.converter = resolveOne(g, URI_WAVES+"converter", x => new Converter(x, new rdf.Graph(all.match(x, null, null)), all, objects));
    }
}

export class StreamWindow extends RDFObject {
    public stream: string;
    public windowSpan: string;
    public label: string;

    constructor(node: RDFNode, g: Graph, objects: Object) {
        super(node, objects);
        this.label = resolveOne(g, URI_RDFS+"label");
        this.stream = resolveOne(g, URI_WAVES+"stream");
        this.windowSpan = resolveOne(g, URI_WAVES+"windowSpan");
    }
}

export class StaticFeed extends RDFObject {
    public label: string;
    public feedType: string;
    public location: string;
    public refreshInterval: string;
    public query: string;

    constructor(node: RDFNode, g: Graph, objects: Object) {
        super(node, objects);
        this.label = resolveOne(g, URI_RDFS+"label");
        this.feedType = resolveOne(g, URI_WAVES+"feedType");
        this.location = resolveOne(g, URI_WAVES+"location");
        this.refreshInterval = resolveOne(g, URI_WAVES+"refreshInterval");
        this.query = resolveOne(g, URI_WAVES+"query");
    }
}

export class Filter extends RDFObject {
    public label: string;
    public consumesStreams: Array<StreamWindow>;
    public producesStream: string;
    public stepRate: string;
    public query: string;
    public staticFeed: StaticFeed;

    constructor(node: RDFNode, g: Graph, all: Graph, objects: Object) {
        super(node, objects);
        this.label = resolveOne(g, URI_RDFS+"label");
        this.producesStream = resolveOne(g, URI_WAVES+"producesStream");
        this.consumesStreams = resolve(g, URI_WAVES+"consumesStream", x => new StreamWindow(x, new rdf.Graph(all.match(x, null, null)), objects));
        this.stepRate = resolveOne(g, URI_WAVES+"stepRate");
        this.query = resolveOne(g, URI_WAVES+"query");
        this.staticFeed = resolveOne(g, URI_WAVES+"staticFeed", x => new StaticFeed(x, new rdf.Graph(all.match(x, null, null)), objects));
    }
}

/**
 * The s1i controller for the app. The controller:
 * - display a <hello world> message
 */
export class MonitoringController {
    public data: any;
    public graph: Graph;
    streams: DataStream[];
    objects: Object;
    filters: Filter[];

    constructor($scope: ng.IScope, graph: Graph) {
        "ngInject";
        var self = this;
        self.graph = graph;
        self.objects = {};

        self.streams = graph.match(null, RDF_TYPE, URI_WAVES + "Stream").map(it => new DataStream(it.subject, new rdf.Graph(graph.match(it.subject, null, null)), graph, self.objects));
        self.filters = graph.match(null, RDF_TYPE, URI_WAVES + "Filter").map(it => new Filter(it.subject, new rdf.Graph(graph.match(it.subject, null, null)), graph, self.objects));
    }
}