import {Visualisation} from "../../model/Visualisation";
import {SectorService} from "../../services/SectorService";

export class DashboardController {
    sensors: any[];
    activeWidget: Function;
    latestEntry: any;
    constructor($timeout: ng.ITimeoutService, SectorService: SectorService,  data, context) {
        let ctrl = this;
        console.log(data.data);
        console.log(context.data);
        
        let websocketActive = false;
        
        ctrl.sensors = context.data['@graph'] && context.data['@graph'].filter(s => s['@type'] === 'http://purl.oclc.org/NET/ssnx/ssn#Sensor') || [];
    
        let unitDic = {};
        ctrl.sensors.forEach((sensor) => {unitDic[sensor['@id']] = sensor['http://data.nasa.gov/qudt/owl/qudt#unit']['@id']});
        
        ctrl.activeWidget = (widgetId: number, widgetConfig: Visualisation<any>) => {
            console.log(widgetId, widgetConfig);
            ctrl['widget'+widgetId+'Active'] = true;
            ctrl['widget'+widgetId+'Config'] = widgetConfig;
            
            if(!websocketActive) {
                // first widget added, we connect the websocket
                connectWS();
            }
        };
        
        let connectWS = () => {
            
            let client = new WebSocket('ws://localhost:3000/ws/54', 'echo-protocol');
            
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
                let parseData = JSON.parse(e.data);
                let sensor = parseData['@graph'][0]['ssn:isProducedBy']['@id'];
                let newValue = parseData['@graph'][1]['qudt:numericValue']['@value'];
                let unit = unitDic[sensor] && SectorService.extractAfterSharp(unitDic[sensor]);
                $timeout(()=>ctrl.latestEntry = {sensor, newValue, unit}, 0);
            };
        }
    }
}