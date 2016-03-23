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
        this.template = '';
        this.link = (scope: PlotComponentScope, element: any[]) => {
            const sector1 = scope.chartName.split('_')[0];
            const sector2 = scope.chartName.split('_')[1];
            const medianTimestamp = scope.chartData[Math.round(scope.chartData.length/2)].timestamp;

            const graphContainer = d3.select(element[0]);
            let graphElement: any = graphContainer[0][0];
            const containerDimensions = graphElement.getBoundingClientRect();

            var marginRight = 60;
            var marginTop = 20;
            var width = containerDimensions.width-marginRight,
                height = 150;

            var svg = graphContainer.append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + marginRight + "," + marginTop + ")");

            if(sector1 === sector2){
                svg.append('text')
                    .attr('x',width/2)
                    .attr('y',height/2)
                    .style('text-anchor', 'middle')
                    .attr('class','sector-name')
                    .text(sector1);
            } else {
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

                scope.chartData.forEach(function (d:any) {
                    d.x = +d.x;
                    d.y = +d.y;
                });

                x.domain(d3.extent(scope.chartData, function (d:any) {
                    return d.x;
                })).nice();
                xAxis.tickValues(x.domain());
                y.domain(d3.extent(scope.chartData, function (d:any) {
                    return d.y;
                })).nice();
                yAxis.tickValues(y.domain());

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                svg.selectAll(".dot")
                    .data(scope.chartData)
                    .enter().append("circle")
                    .attr("class", "dot")
                    .attr("r", 2)
                    .attr("cx", function (d:any) {
                        return x(d.x);
                    })
                    .attr("cy", function (d:any) {
                        return y(d.y);
                    })
                    .style("fill", function (d:any) {
                        return d.timestamp < medianTimestamp ? '#e53935' : '#4CAF50'
                    }); // red : green
            }
        }
    }
}