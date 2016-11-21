import {directive} from "./../../../../decorators/directive";

// Directive stylesheet
import './sensors-map.scss';

interface SensorsMapDirectiveScope extends ng.IScope
{
    clickedOnPoint:Function;
    mapPoints:any;
}

@directive()
export class SensorsMapDirective implements ng.IDirective {

    public scope:any;
    public link:any;
    public template:string;

    private map: L.Map;
    private franceLoc = [47,2];
    private markersArray = [];
    private mapPoints;
    private $scope;
    private max: number;
    private min: number;
    private COLOR_SCALE: any;

    constructor() {

        this.scope = {
            mapPoints: '=',
            latestValue: '='
        };

        this.template = <string>require('./sensors-map.html');
        this.link = ($scope: SensorsMapDirectiveScope) :void => {
    
            this.min = Infinity;
            this.max = 0;

            this.$scope= $scope; // we lose the this context in the watch callback
    
            $scope.$watch('latestValue', (n) => {
                if(n){
                    this.processColorScale(n);
                }
            });
            
            // Init and draw the default map
            this.initMap();
        }
    }

    /**
     * Inits and draws the map, display the data points from the csv
     */
    private initMap:Function = ():void  =>{
        this.$scope.map = L.map('sensorsMap').setView(this.franceLoc, 6);
        L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGVvbmNsZW0iLCJhIjoiY2lpcjh4Z3E5MDA5N3Zra3M0cWdkZWRyZyJ9.LZGaNGGMjhC8Ck8RLHGvXA').addTo(this.$scope.map);
    
        //Draw the Leaflet Circles
        this.addPointsToMap();
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
            var value = marker.options.point.value;
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
            var markerValue = marker.options.point.value;
            var markerLabel = marker.options.point['rdfs:label'];
            if(angular.isDefined(markerValue)){
                marker.setStyle({fillColor: this.COLOR_SCALE(markerValue), color: this.COLOR_SCALE(markerValue)});
                if (angular.isDefined(marker.options.point.value) && angular.isDefined(marker.options.point.lastValue) && this.max !== this.min) {
                    var diffRatio = Math.sqrt(Math.abs((marker.options.point.value - marker.options.point.lastValue) / (this.max - this.min)));
                    var pointSize = Math.max(diffRatio * 1800, 200);
                    marker.setRadius(pointSize);
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
    
        this.$scope.mapPoints.filter(
            point => point['http://www.w3.org/2003/01/geo/wgs84_pos#lat']['@value'] > 0 && point['http://www.w3.org/2003/01/geo/wgs84_pos#long']['@value'] > 0
        ).forEach((point: any) => {
            var pathOptions = {point, fillOpacity: 0.5};
            var marker = L.circle([point['http://www.w3.org/2003/01/geo/wgs84_pos#lat']['@value'], point['http://www.w3.org/2003/01/geo/wgs84_pos#long']['@value']], 350, pathOptions);
            marker.bindPopup(point['rdfs:label']);
            this.markersArray.push(marker);
            this.$scope.map.addLayer(marker);
        });
    
        // Fitting to the markers
        this.$scope.map.fitBounds(L.featureGroup(this.markersArray).getBounds());
        window.dispatchEvent(new Event('resize')); // Resize event need to be manually trigger otherwise the virtual repeat doesn't render
    };
}
