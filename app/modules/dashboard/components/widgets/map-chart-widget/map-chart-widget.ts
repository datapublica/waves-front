import {directive} from "../../../../../decorators/directive";
import {Visualisation} from "../../../../../model/Visualisation";
import {MapChartConfig} from "../../../../../model/VisualisationConfigs/MapChartConfig";

import './map-chart-widget.scss';
import {SectorService} from "../../../../../services/SectorService";

interface MapChartWidgetScope extends ng.IScope
{
    Map: any // must match controllerAs
}

export class MapChartWidget implements ng.IComponentOptions {
    
    public template:any = <string>require('./map-chart-widget.html');
    public restrict:string = "E";
    public bindings:Object = {
        widgetConfig: '=',
        widgetId: '=',
        sensors: '=',
        latestEntry: '='
    };
    public controllerAs:string = 'Map';
    
    public controller:Function = ($scope: MapChartWidgetScope, $timeout: ng.ITimeoutService, $filter:ng.IFilterService , SectorService: SectorService) :void => {
        'ngInject';
        let ctrl = $scope.Map;
    
        let min = Infinity;
        let max = 0;
        let markersArray  = [];
    
        let chartUnit = angular.copy(ctrl.widgetConfig.config.unit.unit);
    
        let chartColorsMetric = angular.copy(ctrl.widgetConfig.config.color);
        let chartSizeMetric = angular.copy(ctrl.widgetConfig.config.size);
        $scope.$watch('Map.latestEntry', (n: any) => {
            if(!n || chartUnit !== n.unit ) return;
    
            processColorScale(angular.copy(n));
        });
    
        /**
         * Inits and draws the map
         */
        let initMap:Function = ():void  =>{
            $timeout(() => {
                ctrl.map = L.map('widgetMap' + ctrl.widgetId).setView([47,2], 6);
                L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGVvbmNsZW0iLCJhIjoiY2lpcjh4Z3E5MDA5N3Zra3M0cWdkZWRyZyJ9.LZGaNGGMjhC8Ck8RLHGvXA')
                .addTo(ctrl.map);
            
                //Draw the Leaflet Circles
                addPointsToMap();
            }, 100);
        };
        
        /**
         * Will determine if a value is red, yellow or green based on the values of other points
         */
        let processColorScale:Function = (latestValue):void => {
            markersArray.forEach(marker => {
                if(marker.options.point['@id'] === latestValue.sensor){
                    marker.options.point.lastValue = angular.copy(marker.options.point.value);
                    marker.options.point.value = parseFloat(latestValue.newValue);
                }
                let value = angular.copy(marker.options.point.value);
                if(value){
                    if(value > max){
                        max = value;
                    } else if(value < min){
                        min = value;
                    }
                }
            });
            const COLOR_SCALE = d3.scale.linear();
            if(chartColorsMetric === 'Diff') {
                COLOR_SCALE.domain([0, 0.5]);
            } else if(chartColorsMetric === 'Value') {
                COLOR_SCALE.domain([min, max]);
            }
            COLOR_SCALE.interpolate(<any>d3.interpolateHcl).range([<any>d3.rgb(76,175,80), <any>d3.rgb(244, 67, 54)]);
            
            const SIZE_SCALE = d3.scale.linear();
            if(chartSizeMetric === 'Diff') {
                SIZE_SCALE.domain([0, 0.5]);
            } else if(chartSizeMetric === 'Value') {
                SIZE_SCALE.domain([min, max]);
            }
            SIZE_SCALE.range([100, 1000]);
        
            markersArray.forEach(marker => {
                let markerValue = marker.options.point.value;
                let markerLabel = marker.options.point['rdfs:label'];
                if(angular.isDefined(markerValue)){
                    if (angular.isDefined(marker.options.point.value) && angular.isDefined(marker.options.point.lastValue) && max !== min) {
                        // console.log(marker.options.point.value, marker.options.point.lastValue);
                        let diffRatio = Math.abs(marker.options.point.value - marker.options.point.lastValue) / (max - min);
                        if(chartSizeMetric === 'Diff'){
                            marker.setRadius(SIZE_SCALE(Math.min(diffRatio * 2, 0.5)));
                        }
                        if(chartColorsMetric === 'Diff'){
                            marker.setStyle({fillColor: COLOR_SCALE(Math.min(diffRatio * 2, 0.5)), color: COLOR_SCALE(Math.min(diffRatio * 2, 0.5))});
                        }
                    }
                    if(chartSizeMetric === 'Value' && markerValue) {
                        marker.setRadius(SIZE_SCALE(markerValue));
                    }
                    if(chartColorsMetric === 'Value') {
                        marker.setStyle({fillColor: COLOR_SCALE(markerValue), color: COLOR_SCALE(markerValue)});
                    }
                    marker.bindPopup(markerLabel + ' : ' + $filter('number')(markerValue, 2) + ' ' + latestValue.unit);
                } else {
                    marker.bindPopup(markerLabel);
                }
            });
        };
    
        /**
         * Add the selected points to the map
         */
        let addPointsToMap:Function = ():void => {
            ctrl.sensors.filter(
                point =>
                point['http://www.w3.org/2003/01/geo/wgs84_pos#lat']['@value'] > 0 && point['http://www.w3.org/2003/01/geo/wgs84_pos#long']['@value'] > 0
                && SectorService.extractAfterSharp(point['http://data.nasa.gov/qudt/owl/qudt#unit']['@id']) === chartUnit
            ).forEach((point: any) => {
                let pathOptions = {point, fillOpacity: 0.5};
                let marker = L.circle([point['http://www.w3.org/2003/01/geo/wgs84_pos#lat']['@value'], point['http://www.w3.org/2003/01/geo/wgs84_pos#long']['@value']], 350, pathOptions);
                marker.bindPopup(point['rdfs:label']);
                markersArray.push(marker);
                ctrl.map.addLayer(marker);
            });
        
            // Fitting to the markers
            ctrl.map.fitBounds(L.featureGroup(markersArray).getBounds());
            window.dispatchEvent(new Event('resize')); // Resize event need to be manually trigger otherwise the virtual repeat doesn't render
        };
    
        // Init and draw the default map
        initMap();
        
        
    };
}