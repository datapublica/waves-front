// Component stylesheet
import {directive} from "../../../../decorators/directive";

// Directive stylesheet
import './plot.scss';
//d3
import 'd3';

interface PlotComponentScope extends ng.IScope
{
    chartData: any,
    chartName: string
}

@directive()
export class PlotDirective implements ng.IDirective {

    public scope:any;
    public link:any;
    public template:string;
    constructor() {
        this.scope = {
            chartData: '<',
            chartName: '<'
        };
        //this.template = '<div>{{chartName}}</div>';
        this.template = '';
        this.link = (scope: PlotComponentScope, element: any[]) => {
            //console.log(scope.chartData);
            const sector1 = scope.chartName.split('&&&')[0].replace(/waves:/,'');
            const sector2 = scope.chartName.split('&&&')[1].replace(/waves:/,'');
            const medianTimestamp = scope.chartData[Math.round(scope.chartData.length/2)].timestamp;
            console.log(medianTimestamp);
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 140,
                height = 140;

            var x = d3.scale.linear()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);


            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var svg = d3.select(element[0]).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            scope.chartData.forEach(function(d: any) {
                d.x = +d.x;
                d.y = +d.y;
            });

            x.domain(d3.extent(scope.chartData, function(d: any) { return d.y; })).nice();
            y.domain(d3.extent(scope.chartData, function(d: any) { return d.x; })).nice();

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width)
                .attr("y", 20)
                .style("text-anchor", "end")
                .text(sector1);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", -30)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(sector2);

            svg.selectAll(".dot")
                .data(scope.chartData)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 2)
                .attr("cx", function(d: any) { return x(d.y); })
                .attr("cy", function(d: any) { return y(d.x); })
                .style("fill", function(d: any) { return d.timestamp < medianTimestamp ? '#e53935': '#1E88E5' }); // blue : red
        }
    }
}