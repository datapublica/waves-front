import {directive} from "../../../../decorators/directive";

// Directive stylesheet
import './sensor-line-chart.scss';

interface sensorLineChartDirectiveScope extends ng.IScope
{
    sensor: any;
    addValue: Function;
}

@directive('$filter')
export class sensorLineChartDirective implements ng.IDirective {
    
    public scope:any;
    public link:any;
    
    private $scope;
    
    constructor($filter: ng.IFilterService) {
        
        this.scope = {
            latestValue: '=',
            sensor: '='
        };
        
        this.link = ($scope: sensorLineChartDirectiveScope, element) :void => {
    
            
            this.$scope= $scope;
            var min = Infinity;
            var max = 0;
    
            $scope.$watch('latestValue', (n: any) => {
                if(n && n.sensor ===  $scope.sensor['@id']){
                    tick(n.newValue);
                }
            });
    
            var limit = 60,
                duration = 750,
                now: number = new Date(Date.now() - duration).getTime();
            const graphContainer = d3.select(element[0]);
            let graphElement: any = graphContainer[0][0];
            const containerDimensions = graphElement.getBoundingClientRect();
    
            var width = containerDimensions.width,
                height = 50;
    
            var data = {
                current: {
                    value: 0,
                    color: 'orange',
                    data: d3.range(limit).map(function() {
                        return 0
                    }),
                    path: {attr:null}
                }
            };
    
            var x: any = d3.time.scale()
            .domain([now - (limit - 2), now - duration])
            .range([0, width]);
    
            var y: any = d3.scale.linear()
            .domain([0, 100])
            .range([height, 0]);
    
            var line = d3.svg.line()
            .interpolate('basis')
            .x(function(d, i) {
                return x(now - (limit - 1 - i) * duration)
            })
            .y(function(d) {
                return y(d)
            });
    
            var svg = graphContainer.append('svg')
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', height + 50);
    
            var zeroLine = svg.append("svg:line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", height)
            .attr("y2", height)
            .attr('class', 'zero-line')
            .style("stroke-width", "0.5")
            .style("stroke", "rgb(143, 215, 236)");
            
            var zeroLabel = svg.append("svg:text")
            .text("0")
            .attr("x", -20)
            .attr("y", height + 5 )
            .style("fill", "rgb(143, 215, 236)")
            .style("font-size", "12px");
            
            var lastValueLabel = svg.append("svg:text")
            .attr("x", width)
            .attr("y", 20)
            .attr("text-anchor", "end")
            .style("fill", "rgb(143, 215, 236)")
            .style("font-weight", "bold")
            .style("font-size", "25px");
    
            var axis = svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));
    
            var paths = svg.append('g');
    
            data.current.path = paths.append('path')
            .data([data.current.data])
            .attr('class', 'current group')
            .style('stroke', data.current.color);
    
            var points = [];

            function tick(value) {
                now = new Date().getTime();
                var entry = {value, date: now};
        
                // Add new values
                data.current.data.push(entry.value); // Real values arrive at irregular intervals
                min = Math.min(...data.current.data);
                max = Math.max(...data.current.data);
                if(min === max){
                    min = min-10;
                    max = max+10;
                }
                data.current.path.attr('d', line);
                
                // update the y domain
                y.domain([min, max]);
                
                points.push(entry);
    
                // var point = svg
                // .append('circle')
                // .attr("r", 3.5)
                // .attr('class', 'point')
                // .attr("cx", function() {
                //     return x(entry.date - duration)
                // })
                // .attr("cy", function() {
                //     return y(entry.value)
                // });
        
                // Shift domain
                x.domain([now - (limit - 2) * duration, now - duration]);
        
                // Slide x-axis left
                axis.transition()
                .duration(duration)
                .ease('linear')
                .call(x.axis);
                
                svg.selectAll('.point')
                .transition()
                .duration(duration)
                .ease('linear')
                .attr("cx", function(d,i) {
                    return x(points[i].date)
                })
                .attr("cy", function(d,i) {
                    return y(points[i].value)
                });
        
                // Slide paths left
                paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease('linear')
                .attr('transform', 'translate(' + x(points[points.length -1].date - (limit - 1) * duration) + ')');
    
                zeroLine
                .transition()
                .duration(duration)
                .ease('linear')
                .attr("y1", y(0))
                .attr("y2", y(0));
    
                zeroLabel
                .transition()
                .duration(duration)
                .ease('linear')
                .attr("y", y(0) + 5);
    
                lastValueLabel
                .text($filter('number')(value,2) + ' m³ / h');
        
                // Remove oldest data point from each group
                data.current.data.shift();
            }
        }
    }
}
