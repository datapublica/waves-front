import {Visualisation} from "../../model/Visualisation";

export class DashboardController {
    sensors: any[];
    activeWidget: Function;
    constructor(data, context) {
        let ctrl = this;
        console.log(data.data);
        console.log(context.data);
    
        ctrl.sensors = context.data['@graph'] && context.data['@graph'].filter(s => s['@type'] === 'http://purl.oclc.org/NET/ssnx/ssn#Sensor') || [];
        
        ctrl.activeWidget = (widgetId: number, widgetConfig: Visualisation<any>) => {
            console.log(widgetId, widgetConfig);
            ctrl['widget'+widgetId+'Active'] = true;
            ctrl['widget'+widgetId+'Config'] = widgetConfig;
        };
    }
}