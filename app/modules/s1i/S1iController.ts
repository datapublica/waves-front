/**
 * The s1i controller for the app
 */
export class S1iController {
    public sensors: any[];
    public units: any[];
    public selectedUnit: any;
    public selectUnit: Function;
    public selectedView: any;
    public selectView: Function;
    public latestValue: any;
    public views: any[];
    
    constructor($location: ng.ILocationService, $timeout: ng.ITimeoutService, $state:ng.ui.IStateService, context: any, data: any) {
        "ngInject";
        var ctrl = this;
        
        var unitDic = {};
        var extractAfterSharp = (str: string) => {
            return str.substring(str.indexOf("#") + 1);
        };
    
        var data = data.data;
    
        ctrl.views = ['Map', 'Line Charts'];
    
        ctrl.units = [
            {
                name: 'Chlorine',
                unit: 'MilligramPerLiter'
            },
            {
                name: 'Input & Output Flow',
                unit: 'CubicMeterPerHour'
            },
            {
                name: 'pH',
                unit: 'pH'
            },
            {
                name: 'Pressure',
                unit: 'Bar'
            }
         ];
        
        ctrl.selectedUnit = $location.search()['unit'] || ctrl.units[1].name;
        ctrl.selectedView = $location.search()['view'] || ctrl.views[0];
        var unitObject = ctrl.units.filter(u => u.name === ctrl.selectedUnit)[0];
        if(!unitObject){
            // If user changes the url manually
            $timeout(() => {
                $state.go('main.s1i', {}, {reload:true, inherit: false});
            }, 0);
        }
        var unitId = unitObject.unit;
        
        ctrl.selectUnit = () => {
            $location.search('unit', ctrl.selectedUnit);
        };
        
        ctrl.selectView = () => {
            $location.search('view', ctrl.selectedView);
        };

        ctrl.sensors = context.data['@graph'] && context.data['@graph'].filter(s =>
            s['@type'] === 'http://purl.oclc.org/NET/ssnx/ssn#Sensor' && extractAfterSharp(s['http://data.nasa.gov/qudt/owl/qudt#unit']['@id']) === unitId
        ) || [];
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
            var unit = unitDic[sensor] && extractAfterSharp(unitDic[sensor]) || null;
            if(unit){
                // If the message is about a sensor on the unit we have selected, we push it to the sensor map directive
                $timeout(()=>ctrl.latestValue = {sensor, newValue, unit}, 0);
            }
        };
        
        data.forEach(d => client.onmessage(<MessageEvent>{data: JSON.stringify(d)}));

    }
}