export class StorageService {
    
    constructor() {
        "ngInject";
    }
    
    public storeWidgetConfigs(widgetConfigs): any {
        localStorage.setItem('widgetConfigs', angular.toJson(widgetConfigs));
        return this.restoreWidgetConfigs();
    }
    
    public updateWidgetConfigs(widgetId, widgetConfig): any {
        let widgetConfigs = this.restoreWidgetConfigs();
        if(!widgetConfigs) {
            widgetConfigs = {};
        }
        widgetConfigs[widgetId] = widgetConfig;
        this.storeWidgetConfigs(widgetConfigs);
    }
    
    public removeWidgetConfig(widgetId): any {
        let widgetConfigs = this.restoreWidgetConfigs();
        delete widgetConfigs[widgetId];
        this.storeWidgetConfigs(widgetConfigs);
    }
    
    public restoreWidgetConfigs(): any {
        return angular.fromJson(localStorage.getItem('widgetConfigs'));
    }
}