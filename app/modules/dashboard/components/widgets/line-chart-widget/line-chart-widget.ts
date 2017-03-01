import {directive} from "../../../../../decorators/directive";
import {Visualisation} from "../../../../../model/Visualisation";
import {LineChartConfig, Serie} from "../../../../../model/VisualisationConfigs/LineChartConfig";

import './line-chart-widget.scss';
import {SectorService} from "../../../../../services/SectorService";

interface LineChartWidgetScope extends ng.IScope
{
    widgetConfig: Visualisation<LineChartConfig>;
}

@directive('$filter', 'SectorService')
export class LineChartWidget implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public template: any;
    
    constructor($filter: ng.IFilterService, SectorService: SectorService) {
        
        this.scope = {
            widgetConfig: '=',
            latestEntry: '='
        };
    
        this.template = <string>require('./line-chart-widget.html');
        this.link = ($scope: LineChartWidgetScope, element): void => {
            
            let limit: number = 60,
                duration:number = 1000,
                now: any = Date.now() - duration;
    
            let series = {};
            let height = 240;
    
            let yScales = {};
            
            $scope.widgetConfig.config.series.forEach((s: Serie) => {
                series[s.sensor['@id'] + ' ' + s.metric.unit] = {
                    sensor: s.sensor['@id'],
                    metric: s.metric.unit,
                    color: s.color.hex,
                    lineType: s.lineType,
                    strokeWidth: s.strokeWidth,
                    data: d3.range(60).map(function(d, i) {
                        return {
                            timestamp: now - (limit - i) * duration,
                            val:0
                        }
                    })
                };
                
                yScales[s.sensor['@id'] + ' ' + s.metric.unit] = d3.scale.linear()
                .domain([0, 100])
                .range([height, 0]);
            });
    
            $scope.$watch('latestEntry', (n) => {
                
                if(!n) return;
    
                addNewEntry(n);
            });
            
            
            // d3 chart code
            
            const graphContainer = d3.select(element[0]);
            let graphElement: any = graphContainer[0][0];
            const containerDimensions = graphElement.getBoundingClientRect();
    
            let width = containerDimensions.width;
            
            let currentSerie;
    
            let x:any = d3.time.scale()
            .domain([now - (limit - 2), now - duration])
            .range([0, width+30]);
    
            let line:any = d3.svg.line()
            .x((d: any) => {
                return x(d.timestamp);
            })
            .y((d: any) => {
                return yScales[currentSerie.sensor + ' ' + currentSerie.metric](d.val);
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
                serie.path = paths.append('path')
                .data([serie.data])
                .attr('class', name + ' serie ' + serie.lineType)
                .style('stroke', serie.color)
                .style('stroke-width', serie.strokeWidth);
    
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
            
            function addNewEntry(newEntry) {
                now = Date.now();
    
                let min, max;
    
                // Add new values
                for (let name in series) {
                    let serie = series[name];
                    if(serie.sensor === newEntry.sensor && serie.metric === newEntry.unit) {
                        serie.data.push(
                            {
                                timestamp: now,
                                val:parseFloat(newEntry.newValue)
                            }
                        );

                        lastValueLabels[serie.sensor + ' ' + serie.metric].text(SectorService.extractAfterSharp(serie.sensor) + ' ' + $filter('number')(newEntry.newValue, 2) + ' ' + SectorService.getUnitLabel(serie.metric));

                        min = Math.min(...serie.data.map(d => d.val));
                        max = Math.max(...serie.data.map(d => d.val));
                        if(min === max){
                            min = min-10;
                            max = max+10;
                        }

                        // update the specific y domain
                        yScales[serie.sensor + ' ' + serie.metric].domain([min, max]);
                    }
                }
            }
    
            function tickChart() {
                now = Date.now();
    
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
                .each('end', () => {
    
                    // Remove oldest data points from each serie
                    for (let name in series) {
                        let serie = series[name];
                        currentSerie = serie;
                        serie.path.attr('d', line);
                        let i = 0;
                        while(i < serie.data.length && serie.data[i].timestamp < (now - limit * duration)) {i++;}
                        if(i > 0){
                            serie.data.splice(0,i);
                        }
                    }
                    tickChart();
                });
            }
            tickChart();
        }
    }
}