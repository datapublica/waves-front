import {directive} from "./../../../../decorators/directive";

var klay: any = require('klayjs-d3');

// Directive stylesheet
import './network.scss';
import {Filter} from "../../MonitoringController";
import {DataStream} from "../../MonitoringController";

interface NetworkDirectiveScope extends ng.IScope {
    streams: DataStream[];
    filters: Filter[];
}

@directive()
export class NetworkDirective implements ng.IDirective {

    public scope: any;
    public link: any;
    public template: string;

    private $scope;
    private graph: any;
    private element: HTMLElement;

    constructor() {

        this.scope = {
            streams: '=',
            filters: '='
        };

        this.template = <string>require('./network.html');
        this.link = ($scope: NetworkDirectiveScope, element: HTMLElement[]): void => {
            this.$scope = $scope;
            this.element = element[0];

            // Init and draw the default map
            this.createGraph($scope.streams, $scope.filters);
            this.createLayout();
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
                    "label": "<converter "+x.converter.label+">"
                });
                gr.edges.push({
                    "id": x.uri+":"+x.converter.uri,
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
                    "label": "<static feed "+x.staticFeed.label+">"
                });
                r.edges.push({
                    "id": x.staticFeed.uri+":"+x.uri,
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
                    "label": "<window "+win.windowSpan+">"
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
            x.width = 100;
            x.height = 40;
            if (x.children) {
                x.children.forEach(c => {
                    c.width = 100;
                    c.height = 40;
                });
            }
        });
        this.graph = gr;
    }

    private createLayout() {

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
            //markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
            // <path d="M0,0 L0,6 L9,3 z"
            .attr("id", "end")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 0)
            .attr("refY", 3)
            .attr("markerWidth", 10)        // marker settings
            .attr("markerHeight", 6)
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
             // x1="0%" y1="0%" x2="100%" y2="0%";
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
                .attr("stroke", (d:any) => {
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
                .attr("font-size", "7px")
                .attr("dy", "7px")
                .attr("dx", 2);

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
                        path += "L" + (d.targetPoint.x - 6) + " " + d.targetPoint.y + " ";
                    }
                    return path;
                });

        });
        layouter.kgraph(this.graph);
    }
}