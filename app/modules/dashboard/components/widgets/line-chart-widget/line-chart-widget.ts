import {directive} from "../../../../../decorators/directive";
import {Visualisation} from "../../../../../model/Visualisation";
import {LineChartConfig} from "../../../../../model/VisualisationConfigs/LineChartConfig";

import './line-chart-widget.scss';
import {SectorService} from "../../../../../services/SectorService";

interface LineChartWidgetScope extends ng.IScope
{
    widgetName: string;
    widgetConfig: Visualisation<LineChartConfig>;
}

@directive('SectorService')
export class LineChartWidget implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public template: any;
    
    private $scope;
    
    constructor(SectorService: SectorService) {
        
        this.scope = {
            widgetConfig: '=',
            latestEntry: '='
        };
    
        this.template = <string>require('./line-chart-widget.html');
        this.link = ($scope: LineChartWidgetScope, element): void => {
            console.log($scope.widgetConfig);
            $scope.widgetName = $scope.widgetConfig.config.name;
            
            let limit: number = 60,
                duration:number = 1000,
                now: any = new Date(Date.now() - duration);
    
            let chartColors = ['#3F51B5', '#4CAF50', '#FF5722'];
            
            let series = {};
            let height = 180;
    
            let yScales = {};
            
            $scope.widgetConfig.config.series.forEach((s,i: number) => {
                series[s.sensor['@id'] + ' ' + s.metric.unit] = {
                    sensor: s.sensor['@id'],
                    metric: s.metric.unit,
                    color: chartColors[i],
                    data: d3.range(60).map(function() {
                        return 0
                    })
                };
                
                yScales[s.sensor['@id'] + ' ' + s.metric.unit] = d3.scale.linear()
                .domain([0, 100])
                .range([height, 0]);
            });
    
            console.log(series);
    
            $scope.$watch('latestEntry', (n) => {
                
                if(!n) return;
                
                tick(n);
            });
            
            
            // d3 chart code
            
            const graphContainer = d3.select(element[0]);
            let graphElement: any = graphContainer[0][0];
            const containerDimensions = graphElement.getBoundingClientRect();
    
            let width = containerDimensions.width;
            
            let currentSerie;
    
            let x:any = d3.time.scale()
            .domain([now - (limit - 2), now - duration])
            .range([0, width]);
    
            let line:any = d3.svg.line()
            .x(function(d, i) {
                return x(now - (limit - 1 - i) * duration);
            })
            .y(function(d) {
                return yScales[currentSerie.sensor + ' ' + currentSerie.metric](d);
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
            
            let lastValueLabelsContainer = svg.insert('g', ':first-child')
                .attr("class", "last-values")
                .attr("transform", "translate(0,20)");
    
            let lastValueLabels = {};
            let dy = 0;
            for (let name in series) {
                let serie = series[name];
                console.log(serie);
                
                serie.path = paths.append('path')
                .data([serie.data])
                .attr('class', name + ' serie')
                .style('stroke', serie.color);
    
                lastValueLabelsContainer
                .append("rect")
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', serie.color)
                .attr("y", dy - 10 + "px")
                .attr("x", 5);
    
                lastValueLabels[serie.sensor + ' ' + serie.metric] = lastValueLabelsContainer.append("text")
                .attr("text-anchor", "start")
                .attr("font-size", "13px")
                .attr("y", dy + "px")
                .attr("x", 20)
                .text(SectorService.extractAfterSharp(serie.sensor));
        
                dy += 20;
            }
    
            function tick(newEntry) {
                now = new Date();
                
                let min, max;
        
                // Add new values
                for (let name in series) {
                    let serie = series[name];
                    serie.shiftMe = false;
                    if(serie.sensor === newEntry.sensor && serie.metric === newEntry.unit) {
                        serie.data.push(parseFloat(newEntry.newValue));
                        // console.log(serie);
                        serie.shiftMe = true;
    
                        lastValueLabels[serie.sensor + ' ' + serie.metric].text(SectorService.extractAfterSharp(serie.sensor) + ' ' + parseFloat(newEntry.newValue) + ' ' + SectorService.getUnitLabel(serie.metric));
                    }
                    min = Math.min(...serie.data);
                    max = Math.max(...serie.data);
                    if(min === max){
                        min = min-10;
                        max = max+10;
                    }
                    currentSerie = serie;
                    serie.path.attr('d', line);
    
                    // update the specific y domain
                    yScales[serie.sensor + ' ' + serie.metric].domain([min, max]);
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
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')');
        
                // Remove oldest data point from each serie
                for (let name in series) {
                    let serie = series[name];
                    if(serie.shiftMe){
                        serie.data.shift()
                    }
                }
            }
        }
    }
}