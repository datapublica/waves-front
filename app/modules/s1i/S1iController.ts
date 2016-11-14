
import {parse} from "uglify-js";
/**
 * The s1i controller for the app
 */
export class S1iController {
    public sensors: any[];
    public units: any[];
    public selectedUnit: any;
    public selectUnit: Function;
    
    constructor($location: ng.ILocationService, context: any) {
        "ngInject";
        var ctrl = this;
        
        var unitDic = {};
        var extractAfterSharp = (str: string) => {
            return str.substring(str.indexOf("#") + 1);
        };
        
        ctrl.units = [
            {
                name: 'Chlorine',
                unit: 'MilligramPerLiter'
            },
            {
                name: 'Pressure',
                unit: 'Bar'
            },
            {
                name: 'input & output Flow',
                unit: 'CubicMeterPerHour'
            },
            {
                name: 'pH',
                unit: 'pH'
            },
         ];
        
        ctrl.selectedUnit = $location.search()['unit'] || ctrl.units[0].name;
        var unitId = ctrl.units.filter(u => u.name === ctrl.selectedUnit)[0].unit;
        
        ctrl.selectUnit = () => {
            $location.search('unit', ctrl.selectedUnit);
        };

        ctrl.sensors = context.data['@graph'] && context.data['@graph'].filter(s =>
            s['@type'] === 'http://purl.oclc.org/NET/ssnx/ssn#Sensor' && extractAfterSharp(s['http://data.nasa.gov/qudt/owl/qudt#unit']['@id']) === unitId
        );
        ctrl.sensors.forEach((sensor) => {unitDic[sensor['@id']] = sensor['http://data.nasa.gov/qudt/owl/qudt#unit']['@id']});
    
        // WebSocket
    
        var client = new WebSocket('ws://localhost:3000/ws/54', 'echo-protocol');
        client.onerror = function() {
            console.log('ÇAY KASSAY');
        };

        client.onopen = function() {
            console.log('ÇAY PARTI');
        };

        client.onclose = function() {
            console.log('ÇAY FINI');
        };

        client.onmessage = (e: any) => {
            var parseData = JSON.parse(e.data);
            var sensor = parseData['@graph'][0]['ssn:isProducedBy']['@id'];
            var newValue = parseData['@graph'][1]['qudt:numericValue']['@value'];
            console.log(extractAfterSharp(sensor), newValue, extractAfterSharp(unitDic[sensor]));
        };

    }
}