// Component stylesheet
import {directive} from "../../../../decorators/directive";

// Directive stylesheet
import './plot.scss';
//d3
import 'd3';
import {HomeService} from "../../../../services/HomeService";

interface PlotComponentScope extends ng.IScope
{
    chartData: any,
    chartName: string
}

@directive('HomeService')
export class PlotDirective implements ng.IDirective {

    public scope:any;
    public link:any;
    public template:string;

    private x:any;
    private y:any;
    private xAxis:any;
    private yAxis:any;
    private xAxisElement:any;
    private yAxisElement:any;
    constructor(private HomeService: HomeService) {
        this.scope = {
            chartData: '<',
            chartName: '<',
            newEntry: '=',
        };
        this.template = '';
        this.link = (scope: PlotComponentScope, element: any[]) => {
            const sector1 = scope.chartName.split('_')[0];
            const sector2 = scope.chartName.split('_')[1];

            const graphContainer = d3.select(element[0]);
            const TRANSITION_DURATION = 1000;
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
            var refreshChart = (firstLoad?) => {
                const medianTimestamp = new Date(scope.chartData[Math.round(scope.chartData.length / 2)].timestamp);

                scope.chartData.forEach(function (d:any) {
                    d.x = +d.x;
                    d.y = +d.y;
                });

                var fill = function () {
                    dots
                        .transition()
                        .duration(TRANSITION_DURATION)
                        .style("fill", function (d:any) {
                            return new Date(d.timestamp) < medianTimestamp ? '#e53935' : '#4CAF50'; // red : green
                        });
                };

                this.x.domain(d3.extent(scope.chartData, function (d:any) {
                    return d.x;
                })).nice();
                this.y.domain(d3.extent(scope.chartData, function (d:any) {
                    return d.y;
                })).nice();

                this.xAxis.tickValues(this.x.domain());
                this.yAxis.tickValues(this.y.domain());
                svg.select(".x.axis").call(this.xAxis);
                svg.select(".y.axis").call(this.yAxis);

                let dots = svg.selectAll(".dot")
                    .data(scope.chartData, (d:any) => d.timestamp);

                    if(firstLoad){
                        dots.enter().append("circle")
                            .attr("class", "dot")
                            .attr("r", "2")
                            .style("fill", function (d:any) {
                                return new Date(d.timestamp) < medianTimestamp ? '#e53935' : '#4CAF50'; // red : green
                            });
                    } else {
                        dots.enter().append("circle")
                            .attr("class", "dot")
                            .attr("r", "0")
                            .style("fill", 'grey')
                            .transition()
                            .duration(TRANSITION_DURATION)
                            .attr("r","5")
                            .style("fill", function (d:any) {
                                return new Date(d.timestamp) < medianTimestamp ? '#e53935' : '#4CAF50'; // red : green
                            })
                            .transition()
                            .duration(TRANSITION_DURATION)
                            .attr('r','2')
                            .each("end", fill);
                    }

                dots.attr("cx", (d:any) => {
                        return this.x(d.x);
                    })
                    .attr("cy", (d:any) => {
                        return this.y(d.y);
                    });

                dots.exit()
                    .transition()
                    .duration(TRANSITION_DURATION)
                    .attr("r", "0")
                    .remove();
            };

            if(sector1 === sector2){
                svg.append('text')
                    .attr('x',width/2)
                    .attr('y',height/2)
                    .style('text-anchor', 'middle')
                    .attr('class','sector-name')
                    .text(sector1);
            } else {
                this.x = d3.scale.linear()
                    .range([0, width]);

                this.y = d3.scale.linear()
                    .range([height, 0]);

                this.xAxis = d3.svg.axis()
                    .scale(this.x)
                    .orient("bottom");

                this.yAxis = d3.svg.axis()
                    .scale(this.y)
                    .orient("left");

                this.xAxisElement = svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")");

                this.yAxisElement = svg.append("g")
                    .attr("class", "y axis");

                refreshChart(true);
            }

            scope.$watch('newEntry', (newEntry: any[]) => {

                let ySector = scope.chartName.split('_')[0];
                let xSector = scope.chartName.split('_')[1];
                if(xSector === ySector || angular.isUndefined(newEntry)){
                    return;
                }
                let newPoint = {
                    timestamp: undefined,
                    n:true,
                    x: undefined,
                    y: undefined
                };
                newPoint.timestamp = newEntry.filter((input) => {
                    return input['@type'] === "waves:Event";
                })[0]['waves:time']['@value'];
                newEntry.forEach((input) => {
                    if(input['waves:relatedSector']) {
                        if (HomeService.getSectorLabel(input['waves:relatedSector']['@id']) === xSector) {
                            newPoint.x = input['qudt:numericValue']['@value'];
                        }
                        if (HomeService.getSectorLabel(input['waves:relatedSector']['@id']) === ySector) {
                            newPoint.y = input['qudt:numericValue']['@value'];
                        }
                    }
                });
                scope.chartData.shift();
                refreshChart();
                scope.chartData.push(newPoint);
                refreshChart();
            });
        }
    }
}