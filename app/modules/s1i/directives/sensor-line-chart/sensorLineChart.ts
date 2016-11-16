import {directive} from "./../../../../decorators/directive";

// Directive stylesheet
import './sensor-line-chart.scss';

interface sensorLineChartDirectiveScope extends ng.IScope
{
    sensor: any;
    addValue: Function;
}

@directive()
export class sensorLineChartDirective implements ng.IDirective {
    
    public scope:any;
    public link:any;
    
    private $scope;
    
    constructor() {
        
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
    
            var axis = svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));
    
            var paths = svg.append('g');
    
            data.current.path = paths.append('path')
            .data([data.current.data])
            .attr('class', 'current group')
            .style('stroke', data.current.color);

            function tick(value) {
                now = new Date().getTime();
        
                // Add new values
                data.current.data.push(value); // Real values arrive at irregular intervals
                min = Math.min(...data.current.data);
                max = Math.max(...data.current.data);
                if(min === max){
                    min = min-10;
                    max = max+10;
                }
                data.current.path.attr('d', line);
                
                // update the y domain
                y.domain([min, max]);
        
                // Shift domain
                x.domain([now - (limit - 2) * duration, now - duration]);
        
                // Slide x-axis left
                axis.transition()
                .duration(duration)
                .ease('linear')
                .call(x.axis);
        
                // Slide paths left
                paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease('linear')
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')');
        
                // Remove oldest data point from each group
                data.current.data.shift();
            }
        }
    }
}
