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

    constructor() {

        this.scope = {
            mapPoints: '='
        };

        this.template = <string>require('./sensors-map.html');
        this.link = ($scope: SensorsMapDirectiveScope) :void => {

            this.$scope= $scope; // we lose the this context in the watch callback
    
            $scope.$watch('mapPoints', (n, o) => {
                if(n !== o){
                    this.$scope.mapPoints = n;
                    this.cleanMap();
                    this.addPointsToMap();
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
     * Removes the geojson/canvas layers off the map
     */
    private cleanMap:Function = ():void => {
        angular.forEach(this.markersArray, (layer) => {
            this.$scope.map.removeLayer(layer);
        });
    };
    /**
     * Add the selected points to the map
     */
    private addPointsToMap:Function = ():void => {
    
    
        const oms = new OverlappingMarkerSpiderfier(this.$scope.map, {keepSpiderfied: true, nearbyDistance: 50});
    
        this.$scope.mapPoints.filter(
            point => point['http://www.w3.org/2003/01/geo/wgs84_pos#lat']['@value'] > 0 && point['http://www.w3.org/2003/01/geo/wgs84_pos#long']['@value'] > 0
        ).forEach((point: any) => {
            var icon: L.Icon = new L.Icon.Default({shadowSize:[0,0]});
            var marker = L.marker(new L.LatLng(point['http://www.w3.org/2003/01/geo/wgs84_pos#lat']['@value'], point['http://www.w3.org/2003/01/geo/wgs84_pos#long']['@value']), {icon : icon});
            marker.bindPopup(point['rdfs:label']);
            this.markersArray.push(marker);
            this.$scope.map.addLayer(marker);
            oms.addMarker(marker);
        });

        // Fitting to the markers
        this.$scope.map.fitBounds(L.featureGroup(this.markersArray).getBounds());
        window.dispatchEvent(new Event('resize')); // Resize event need to be manually trigger otherwise the virtual repeat doesn't render
    }
}