import {directive} from "./../../../../decorators/directive";

var klay: any = require('klayjs-d3');

let NODE_WIDTH = 200;
let NODE_HEIGHT = 80;
let FONT_SIZE = 10;
let PLOT_HEIGHT = 60;
let PLOT_WIDTH = 125;
let MARKER_SIZE = 15;


var pathFromData = function (points: number[], update?: boolean): any {
    let max = Math.max(points.reduce((a, b) => Math.max(a, b)), 10);
    return points.map((e, i) => [(PLOT_WIDTH * (update ? i + 1 : i) / points.length), (PLOT_HEIGHT - PLOT_HEIGHT * (e) / (max))]);
};

var lineInterpolation = d3.svg.line()
    .interpolate("basis")
    .x(function (d: number[]) {
        return d[0];
    })
    .y(function (d: number[]) {
        return d[1];
    });

var lineFunction = (points: number[], update?: boolean) => lineInterpolation(pathFromData(points, update));

// Directive stylesheet
import './network.scss';
import {Filter} from "../../MonitoringController";
import {DataStream} from "../../MonitoringController";
import Line = d3.svg.Line;

interface NetworkDirectiveScope extends ng.IScope {
    streams: DataStream[];
    filters: Filter[];
    networkStatus: any;
    metricUnits: any;
    metricSelection: any;
}

@directive('$filter')
export class NetworkDirective implements ng.IDirective {

    public scope: any;
    public link: any;
    public template: string;

    private $scope;
    private graph: any;
    private element: HTMLElement;

    private numberFilter: ng.IFilterNumber;

    constructor($filter: ng.IFilterService) {
        "ngInject";
        this.scope = {
            streams: '=',
            filters: '=',
            networkStatus: '=',
            metricUnits: '=',
            metricSelection: '='
        };

        this.numberFilter = $filter("number");
        this.template = <string>require('./network.html');
        this.link = ($scope: NetworkDirectiveScope, element: HTMLElement[]): void => {
            this.$scope = $scope;
            this.element = element[0];

            // Init and draw the default map
            this.createGraph($scope.streams, $scope.filters);
            this.createLayout($scope.networkStatus, $scope.metricSelection);

            $scope.$watch('networkStatus', (n, o) => {
                if (n != o) {
                    this.update($scope.networkStatus, $scope.metricSelection);
                }
            });
            var init = 1;
            $scope.$watch('metricSelection', () => {
                if (init) {
                    init = 0;
                    return;
                }
                this.update($scope.networkStatus, $scope.metricSelection);
            }, true);
        }
    }

    private createGraph(streams: DataStream[], filters: Filter[]) {
        var gr = {
            "root": true,
            "children": [],
            "edges": []
        };

        streams.forEach(x => {
            gr.children.push({
                "id": x.uri,
                "data": x,
                "label": x.label
            });
            if (x.converter) {
                gr.children.push({
                    "id": x.converter.uri,
                    "data": x.converter,
                    "label": "<converter " + x.converter.label + ">"
                });
                gr.edges.push({
                    "id": x.uri + ":" + x.converter.uri,
                    "target": x.uri,
                    "source": x.converter.uri
                });
            }
        });
        filters.forEach(x => {
            let groupId = "group:" + x.uri;
            var r: any = {
                "id": groupId,
                "children": [{
                    // the actual filter
                    "id": x.uri,
                    "data": x,
                    "label": x.label
                }],
                "ports": [],
                "edges": []
            };
            // produces
            let portProduce = "port:" + x.uri + ":" + x.producesStream;
            r.ports.push({
                "id": portProduce,
                "width": 5,
                "height": 5
            });
            // from port to the stream
            gr.edges.push({
                "id": portProduce,
                "source": groupId,
                "sourcePort": portProduce,
                "target": x.producesStream
            });
            // from filter to port
            r.edges.push({
                "id": "internal" + portProduce,
                "targetPort": portProduce,
                "source": x.uri,
                "target": groupId
            });

            if (x.staticFeed) {
                r.children.push({
                    "id": x.staticFeed.uri,
                    "data": x.staticFeed,
                    "label": "<static feed " + x.staticFeed.label + ">"
                });
                r.edges.push({
                    "id": x.staticFeed.uri + ":" + x.uri,
                    "source": x.staticFeed.uri,
                    "target": x.uri
                })
            }

            // consumes
            x.consumesStreams.forEach(win => {
                let portConsume = "port:" + x.uri + ":" + win.uri;

                r.children.push({
                    "id": win.uri,
                    "data": win,
                    "label": "<window " + win.windowSpan + ">"
                });

                r.ports.push({
                    "id": portConsume,
                    "width": 5,
                    "height": 5
                });
                // from stream to the port
                gr.edges.push({
                    "id": portConsume,
                    "target": groupId,
                    "targetPort": portConsume,
                    "source": win.stream
                });
                // from port to window
                r.edges.push({
                    "id": "internal:" + portConsume,
                    "sourcePort": portConsume,
                    "target": win.uri,
                    "source": groupId
                });
                // from window to filter
                r.edges.push({
                    "id": "edge:" + win.uri,
                    "target": x.uri,
                    "source": win.uri
                });
            });
            gr.children.push(r);
        });

        gr.children.forEach(x => {
            // compute node size
            x.width = NODE_WIDTH;
            x.height = NODE_HEIGHT;
            if (x.children) {
                x.children.forEach(c => {
                    c.width = NODE_WIDTH;
                    c.height = NODE_HEIGHT;
                });
            }
        });
        this.graph = gr;
    }

    private createLayout(networkStatus: any, selectedMetric: any) {
        var self = this;
        var zoom = d3.behavior.zoom()
            .on("zoom", () => {
                svg.attr("transform", "translate(" + d3.event['translate'] + ")"
                    + " scale(" + d3.event['scale'] + ")");
            });

        var svg = d3.select(this.element).select("svg")
            .style({"border": "1px solid gray"})
            .call(zoom)
            .append("g");

        // define an arrow head
        let defs = svg.append("svg:defs");
        defs
            .append("svg:marker")
            .attr("id", "end")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 0)
            .attr("refY", 3)
            .attr("markerWidth", MARKER_SIZE)        // marker settings
            .attr("markerHeight", MARKER_SIZE / 2 + 1)
            .attr("orient", "auto")
            .attr("markerUnits", "strokeWidth")
            .append("svg:path")
            .attr("d", "M0,0 L0,6 L9,3 z");
        let gradient = defs.append("svg:linearGradient")
            .attr("id", "boxGradient")
            .attr("spreadMethod", "reflect")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "100%");
        gradient
            .append("svg:stop")
            .attr("stop-opacity", 0.902)
            .attr("stop-color", "rgb(255,255,255)")
            .attr("offset", "0%");
        gradient
            .append("svg:stop")
            .attr("stop-opacity", 0.8)
            .attr("stop-color", "rgb(212,212,212)")
            .attr("offset", "100%");

        // group shizzle
        var root = svg.append("g");


        var layouter = klay.d3kgraph();
        layouter
            .size([this.element.clientWidth, this.element.clientHeight])
            .options({
                edgeRouting: "ORTHOGONAL",
                nodeLayering: "INTERACTIVE",
            })
            .transformGroup(root);

        layouter.on("finish", function () {

            var nodes = layouter.nodes();
            var links = layouter.links(nodes);


            // #1 add the nodes' groups
            var nodeData = root.selectAll(".node")
                .data(nodes, function (d: any) {
                    return d.id;
                });


            var node = nodeData.enter()
                .append("g")
                .attr("class", function (d: any) {
                    if (d.root) return "node root";
                    if (d.children)
                        return "node compound";
                    else
                        return "node leaf";
                })
                .attr("transform", function (d: any) {
                    return "translate(" + (d.x || 0) + " " + (d.y || 0) + ")";
                });

            // add representing boxes for nodes
            let baseNodes = node.filter(x => !x.children);
            baseNodes
                .append("rect")
                .attr("class", "atom")
                .attr("width", (d: any) => d.width)
                .attr("height", (d: any) => d.height)
                .attr("fill", "url(#boxGradient)")
                .attr("rx", 3)
                .attr("ry", 3)
                .attr("stroke", (d: any) => {
                    if (d.data instanceof DataStream) {
                        return "blue";
                    } else if (d.data instanceof Filter) {
                        return "red";
                    }
                    return "gray";
                });
            // add node labels
            baseNodes.append("text")
                .text(function (d: any) {
                    return d.label;
                })
                .attr("font-size", FONT_SIZE)
                .attr("dy", FONT_SIZE)
                .attr("dx", 2);

            baseNodes.append("text")
                .text(function (d: any) {
                    return selectedMetric[d.id];
                })
                .attr("class", "monitoring-selected-metric")
                .attr("cursor", "pointer")
                .attr("font-size", FONT_SIZE)
                .attr("dy", FONT_SIZE)
                .attr("text-anchor", "end")
                .attr("dx", NODE_WIDTH-2)
                .on("click", function (d: any) {
                    // new metric
                    self.$scope.$apply(() => {
                        var current = selectedMetric[d.id];
                        var allMetrics = Object.keys(self.$scope.metricUnits);
                        selectedMetric[d.id] = allMetrics[(allMetrics.indexOf(current)+1)%allMetrics.length];
                    });
                });

            function createMetricAgg(agg: string, i: number) {
                baseNodes.append("text")
                    .text(function (d: any) {
                        return self.numberFilter(networkStatus[d.id][selectedMetric[d.id]].aggregates[agg], 1) + " " + self.$scope.metricUnits[selectedMetric[d.id]];
                    })
                    .attr("class", "monitoring-metric-"+(agg.replace("%", "")))
                    .attr("font-size", FONT_SIZE-1)
                    .attr("dy", (FONT_SIZE + 1) * i)
                    .attr("text-anchor", "end")
                    .attr("dx", NODE_WIDTH-5);
                baseNodes.append("text")
                    .text(agg+":")
                    .attr("font-size", FONT_SIZE-1)
                    .attr("dy", (FONT_SIZE + 1) * i)
                    .attr("dx", PLOT_WIDTH+10);
            }

            createMetricAgg("min", 2);
            createMetricAgg("avg", 3);
            createMetricAgg("95%", 4);
            createMetricAgg("max", 5);

            let toUpdate = baseNodes.append("g")
                .attr("transform", "translate(5," + (NODE_HEIGHT - PLOT_HEIGHT - 5) + ")");

            toUpdate.append("rect")
                .attr("fill", "white")
                .attr("width", PLOT_WIDTH)
                .attr("height", PLOT_HEIGHT);

            toUpdate.append("path")
                .attr("class", "monitoring-plot")
                .attr("stroke", "red")
                .attr("stroke-width", "1px")
                .attr("fill", "none")
                .attr("d", (d: any) => lineFunction(networkStatus[d.id][selectedMetric[d.id]].latestPoints, false));

            node.filter(x => x.children)
                .append("rect")
                .attr("class", "container")
                .attr("width", (d: any) => d.width)
                .attr("height", (d: any) => d.height)
                .attr("rx", 5)
                .attr("ry", 5);

            var port = node.filter(d => d.ports)
                .selectAll(".port")
                .data(function (d) {
                    return d.ports;
                })
                .enter()
                .append("rect")
                .attr("class", "port")
                .attr("width", (d: any) => d.width)
                .attr("height", (d: any) => d.height)
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);

            root.selectAll(".link")
                .data(links, function (d: any) {
                    return d.id;
                })
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("marker-end", "url(#end)")
                .attr("d", function (d: any) {
                    var path = "";
                    if (d.sourcePoint && d.targetPoint) {
                        path += "M" + d.sourcePoint.x + " " + d.sourcePoint.y + " ";
                        (d.bendPoints || []).forEach(function (bp, i) {
                            path += "L" + bp.x + " " + bp.y + " ";
                        });
                        path += "L" + (d.targetPoint.x - MARKER_SIZE / 2 - 1) + " " + d.targetPoint.y + " ";
                    }
                    return path;
                });

        });
        layouter.kgraph(this.graph);
    }

    private update(networkStatus: any, selectedMetric: any) {
        let self = this;
        let svg = d3.select(this.element);
        svg.selectAll(".monitoring-plot")
            .attr("d", (d: any) => lineFunction(networkStatus[d.id][selectedMetric[d.id]].latestPoints, true))
            .transition()
            .duration(1000)
            .attr("transform", (d: any) => "translate(" + (-PLOT_WIDTH / networkStatus[d.id][selectedMetric[d.id]].latestPoints.length) + ",0)")
            .transition()
            .duration(0)
            .attr("transform", null)
            .attr("d", (d: any) => lineFunction(networkStatus[d.id][selectedMetric[d.id]].latestPoints, false));
        svg.selectAll(".monitoring-selected-metric")
            .text((d:any) => selectedMetric[d.id]);
        ["95%", "avg", "min", "max"].forEach(agg => {
            svg.selectAll(".monitoring-metric-"+agg.replace("%", ""))
                .text(function (d: any) {
                    return self.numberFilter(networkStatus[d.id][selectedMetric[d.id]].aggregates[agg], 1) + " " + self.$scope.metricUnits[selectedMetric[d.id]];
                });
        });
    }
}