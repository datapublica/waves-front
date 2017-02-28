import {Visualisation} from "../../model/Visualisation";
import {SectorService} from "../../services/SectorService";
import {StreamingService} from "../../services/StreamingService";
import {StorageService} from "../../services/StorageService";


export class DashboardController {
    sensors: any[];
    activeWidget: Function;
    latestEntry: any;
    streams: any;
    color: any;
    deleteWidget: Function;
    modifyWidget: Function;
    constructor($scope: ng.IScope, SectorService: SectorService, StreamingService: StreamingService, StorageService:StorageService, data, context, widgetsLocalStorage) {
        "ngInject";
        let ctrl = this;
        
        ctrl.streams = {};
        ctrl.sensors = context.data['@graph'] && context.data['@graph'].filter(s => s['@type'] === 'http://purl.oclc.org/NET/ssnx/ssn#Sensor') || [];
        
        ctrl.color = {};
        
        let unitDic = {};
        ctrl.sensors.forEach((sensor) => {unitDic[sensor['@id']] = sensor['http://data.nasa.gov/qudt/owl/qudt#unit']['@id']});
        
        ctrl.activeWidget = (widgetId: number, widgetConfig: Visualisation<any>) => {
            ctrl['widget'+widgetId+'Active'] = true;
            ctrl['widget'+(widgetId+1)+'Display'] = true;
            ctrl['widget'+widgetId+'Config'] = angular.copy(widgetConfig);
            
            StorageService.updateWidgetConfigs(widgetId, widgetConfig);
            
            // listening to the data
            if (!ctrl.streams[widgetConfig.stream.id]) {
                ctrl.streams[widgetConfig.stream.id] = StreamingService.mockData(widgetConfig.stream.id, parseData => {
                    let sensor = parseData['@graph'].filter(g => g['@type'] === "ssn:SensorOutput")[0]['ssn:isProducedBy']['@id'];
                    let newValue = parseData['@graph'].filter(g => g['@type'] === "ssn:ObservationValue")[0]['qudt:numericValue']['@value'];
                    let unit = unitDic[sensor] && SectorService.extractAfterSharp(unitDic[sensor]);
                    // console.log({sensor, newValue, unit});
                    ctrl.latestEntry = {sensor, newValue, unit};
                });
            }
        };
    
        // if widgetConfigs stored in localeStorage, we activate the corresponding widgets
        if(widgetsLocalStorage) {
            [1,2,3,4].forEach(widgetId => {
                let storedConfig = widgetsLocalStorage[widgetId];
                if(storedConfig){
                    // config exists, we activate the widgets before it, just in case
                    for(let i = 1; i < widgetId; i++){
                        ctrl['widget'+(i+1)+'Display'] = true;
                    }
                
                    // and we activate the widget
                    ctrl.activeWidget(widgetId, storedConfig);
                }
            })
        }
        
        $scope.$on("$destroy", function() {
            for(let key in ctrl.streams) {
                ctrl.streams[key].stop();
            }
        });
        
        ctrl.deleteWidget = (widgetId: number) => {
            ctrl['widget'+widgetId+'Active'] = false;
            ctrl['widget'+widgetId+'Config'] = null;
            StorageService.removeWidgetConfig(widgetId);
        };
    
        ctrl.modifyWidget = (widgetId: number, widgetConfig: Visualisation<any>) => {
            ctrl['widget'+widgetId+'Active'] = false;
        };
    }
}