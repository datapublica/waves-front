import {directive} from "../../../../../decorators/directive";
import {Visualisation} from "../../../../../model/Visualisation";
import {MapChartConfig} from "../../../../../model/VisualisationConfigs/MapChartConfig";

import './map-chart-widget.scss';
import {SectorService} from "../../../../../services/SectorService";

interface MapChartWidgetScope extends ng.IScope
{
    widgetName: string;
    widgetConfig: Visualisation<MapChartConfig>;
    sensors: any;
}

@directive('$timeout', 'SectorService')
export class MapChartWidget implements ng.IDirective {
    
    public scope: any;
    public link: any;
    public template: any;
    
    private $scope;
    
    private markersArray = [];
    private sensors;
    private max: number;
    private min: number;
    private COLOR_SCALE: any;
    private SectorService: SectorService;
    private $timeout: ng.ITimeoutService;
    private chartUnit: string;
    private chartSizeMetric: string;
    private chartColorsMetric: string;
    
    constructor($timeout: ng.ITimeoutService, SectorService: SectorService) {
        
        this.scope = {
            widgetConfig: '=',
            widgetId: '=',
            sensors: '=',
            latestEntry: '='
        };
    
        this.template = <string>require('./map-chart-widget.html');
        this.link = ($scope: MapChartWidgetScope): void => {
            $scope.widgetName = $scope.widgetConfig.config.name;
    
            this.min = Infinity;
            this.max = 0;
            this.SectorService = SectorService;
            this.$timeout = $timeout;
    
            this.$scope= $scope; // we lose the this context in the watch callback
    
            console.log($scope.widgetConfig);
            this.chartUnit = angular.copy($scope.widgetConfig.config.unit.unit);
            
            this.chartColorsMetric = angular.copy($scope.widgetConfig.config.color);
            this.chartSizeMetric = angular.copy($scope.widgetConfig.config.size);
            $scope.$watch('latestEntry', (n: any) => {
                if(!n || this.chartUnit !== n.unit ) return;
    
                // console.log(n);
                this.processColorScale(angular.copy(n));
            });
    
            // Init and draw the default map
            this.initMap();
        }
    }
    
    /**
     * Inits and draws the map
     */
    private initMap:Function = ():void  =>{
        this.$timeout(() => {
            this.$scope.map = L.map('widgetMap' + this.$scope.widgetId).setView([47,2], 6);
            L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGVvbmNsZW0iLCJhIjoiY2lpcjh4Z3E5MDA5N3Zra3M0cWdkZWRyZyJ9.LZGaNGGMjhC8Ck8RLHGvXA').addTo(this.$scope.map);
    
            //Draw the Leaflet Circles
            this.addPointsToMap();
        }, 0);
    };
    
    /**
     * Will determine if a value is red, yellow or green based on the values of other points
     */
    private processColorScale:Function = (latestValue):void => {
        this.markersArray.forEach(marker => {
            if(marker.options.point['@id'] === latestValue.sensor){
                marker.options.point.lastValue = marker.options.point.value;
                marker.options.point.value = parseFloat(latestValue.newValue);
            }
            let value = marker.options.point.value;
            if(value){
                if(value > this.max){
                    this.max = value;
                } else if(value < this.min){
                    this.min = value;
                }
            }
        });
        this.COLOR_SCALE = d3.scale.linear();
        this.COLOR_SCALE.domain([this.min,this.max]);
        //noinspection TypeScriptValidateTypes
        this.COLOR_SCALE.interpolate(d3.interpolateHcl).range([d3.rgb("#4CAF50"), d3.rgb('#F44336')]);
    
        this.markersArray.forEach(marker => {
            let markerValue = marker.options.point.value;
            let markerLabel = marker.options.point['rdfs:label'];
            if(angular.isDefined(markerValue)){
                if (angular.isDefined(marker.options.point.value) && angular.isDefined(marker.options.point.lastValue) && this.max !== this.min) {
                    if(this.chartSizeMetric === 'Diff'){
                        let diffRatio = Math.sqrt(Math.abs((marker.options.point.value - marker.options.point.lastValue) / (this.max - this.min)));
                        let pointSize = Math.max(diffRatio * 1800, 200);
                        marker.setRadius(pointSize);
                    }
                    if(this.chartColorsMetric === 'Diff'){
                        marker.setStyle({fillColor: this.COLOR_SCALE(marker.options.point.lastValue), color: this.COLOR_SCALE(marker.options.point.lastValue)});
                    }
                }
                if(this.chartSizeMetric === 'Value'){
                    marker.setRadius(markerValue);
                }
                if(this.chartColorsMetric === 'Value') {
                    marker.setStyle({fillColor: this.COLOR_SCALE(markerValue), color: this.COLOR_SCALE(markerValue)});
                }
                marker.bindPopup(markerLabel + ' : ' + markerValue + ' ' + latestValue.unit);
            } else {
                marker.bindPopup(markerLabel);
            }
        });
    };
    
    /**
     * Add the selected points to the map
     */
    private addPointsToMap:Function = ():void => {
        this.$scope.sensors.filter(
            point =>
            point['http://www.w3.org/2003/01/geo/wgs84_pos#lat']['@value'] > 0 && point['http://www.w3.org/2003/01/geo/wgs84_pos#long']['@value'] > 0
            && this.SectorService.extractAfterSharp(point['http://data.nasa.gov/qudt/owl/qudt#unit']['@id']) === this.chartUnit
        ).forEach((point: any) => {
            let pathOptions = {point, fillOpacity: 0.5};
            let marker = L.circle([point['http://www.w3.org/2003/01/geo/wgs84_pos#lat']['@value'], point['http://www.w3.org/2003/01/geo/wgs84_pos#long']['@value']], 350, pathOptions);
            marker.bindPopup(point['rdfs:label']);
            this.markersArray.push(marker);
            this.$scope.map.addLayer(marker);
        });
        
        // Fitting to the markers
        this.$scope.map.fitBounds(L.featureGroup(this.markersArray).getBounds());
        window.dispatchEvent(new Event('resize')); // Resize event need to be manually trigger otherwise the virtual repeat doesn't render
    };
}