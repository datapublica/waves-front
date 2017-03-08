import {DataStream, Filter} from "../main/MainRouting";
/**
 * The s1i controller for the app. The controller:
 * - display a <hello world> message
 */
export class MonitoringController {
    public data: any;
    public graph: Graph;
    streams: DataStream[];
    filters: Filter[];
    metricUnits: any;
    networkStatus: any;
    metricSelection: Object = {};

    constructor($scope: ng.IScope, metricUnits: any, filters: Filter[], streams: DataStream[]) {
        "ngInject";
        var self = this;
        self.networkStatus = {};
        self.metricUnits = metricUnits;
        self.filters = filters;
        self.streams = streams;
    }
}