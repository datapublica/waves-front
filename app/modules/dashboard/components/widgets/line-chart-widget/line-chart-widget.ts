import {directive} from "../../../../../decorators/directive";
import {Visualisation} from "../../../../../model/Visualisation";
import {LineChartConfig} from "../../../../../model/VisualisationConfigs/LineChartConfig";

import './line-chart-widget.scss';

interface LineChartWidgetScope extends ng.IScope
{
    series: {sensor: string, metric: string, data: number[]}[];
    widgetName: string;
    widgetConfig: Visualisation<LineChartConfig>;
}

@directive()
export class LineChartWidget implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public template: any;
    
    private $scope;
    
    constructor() {
        
        this.scope = {
            widgetConfig: '=',
            latestEntry: '='
        };
    
        this.template = <string>require('./line-chart-widget.html');
        this.link = ($scope: LineChartWidgetScope, element): void => {
            console.log($scope.widgetConfig);
            $scope.widgetName = $scope.widgetConfig.config.name;
            
            let widgetSensors = $scope.widgetConfig.config.series.map(s => s.sensor['@id']);
            
            $scope.series = [];
            
            $scope.widgetConfig.config.series.forEach(s => {
                $scope.series.push({
                    sensor: s.sensor['@id'],
                    metric: s.metric.unit,
                    data: []
                });
            });
    
            $scope.$watch('latestEntry', (n) => {
                
                if(!n) return;
                
                $scope.series.forEach(s => {
                    if(s.sensor === n.sensor && s.metric === n.metric) {
                        s.data.push(n.newValue);
                    }
                });
    
                console.log($scope.series);
            });
            
            
            // d3 chart code
    
            let limit = 60,
                duration = 750,
                now = new Date(Date.now() - duration);
    
            let groups = {
                current: {
                    value: 0,
                    color: 'orange',
                    data: d3.range(limit).map(function() {
                        return 0
                    })
                },
                target: {
                    value: 0,
                    color: 'green',
                    data: d3.range(limit).map(function() {
                        return 0
                    })
                },
                output: {
                    value: 0,
                    color: 'grey',
                    data: d3.range(limit).map(function() {
                        return 0
                    })
                }
            };
    
            const graphContainer = d3.select(element[0]);
            let graphElement: any = graphContainer[0][0];
            const containerDimensions = graphElement.getBoundingClientRect();
    
            let width = containerDimensions.width,
                height = 190;
    
            let x:any = d3.time.scale()
            .domain([now - (limit - 2), now - duration])
            .range([0, width]);
    
            let y: any = d3.scale.linear()
            .domain([0, 100])
            .range([height, 0]);
    
            let line = d3.svg.line()
            .interpolate('basis')
            .x(function(d, i) {
                return x(now - (limit - 1 - i) * duration);
            })
            .y(function(d) {
                return y(d)
            });
            
            let svg = graphContainer.select('.graph-container').append('svg')
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', height+50);
    
            let axis = svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));
    
            let paths = svg.append('g');
    
            for (let name in groups) {
                let group = groups[name];
                group.path = paths.append('path')
                .data([group.data])
                .attr('class', name + ' group')
                .style('stroke', group.color)
            }
    
            function tick() {
                now = new Date();
        
                // Add new values
                for (let name in groups) {
                    let group = groups[name];
                    //group.data.push(group.value) // Real values arrive at irregular intervals
                    group.data.push(20 + Math.random() * 100);
                    group.path.attr('d', line)
                }
        
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
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                .each('end', tick);
        
                // Remove oldest data point from each group
                for (let name in groups) {
                    let group = groups[name];
                    group.data.shift()
                }
            }
    
            tick()
        }
    }
}