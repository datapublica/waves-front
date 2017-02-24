import IHttpPromise = angular.IHttpPromise;
export class StreamingService {
    private http:ng.IHttpService;
    private log:ng.ILogService;
    private timeout: ng.ITimeoutService;
    private interval: ng.IIntervalService;

    constructor($http, $log, $timeout, $interval){
        "ngInject";
        this.http = $http;
        this.timeout = $timeout;
        this.interval = $interval;
        this.log = $log;
    }

    public streamData(streamId: number, callback):any {
        let client = new WebSocket('ws://localhost:3000/ws/'+streamId, 'echo-protocol');

        var websocketActive = true;

        client.onerror = function() {
            websocketActive = false;
            console.log('ÇAY KASSAY');
        };

        client.onopen = function() {
            console.log('ÇAY PARTI');
        };

        client.onclose = function() {
            websocketActive = false;
            console.log('ÇAY FINI');
        };

        client.onmessage = (e: any) => {
            let parseData = JSON.parse(e.data);
            this.timeout(()=>callback(parseData), 0);
        };
        return {
            isActive: function() {
                return websocketActive;
            },
            stop: function() {
                client.close();
            }
        }
    }

    public mockData(streamId: number, callback):any {
        let series = {};
        let interval = this.interval;
        let active = true;
        let baseData = require<string>("../assets/data/dump-"+streamId+".json");
        let intervalResult = interval(() => {
            let base = JSON.parse(baseData); // copy original data
            base.forEach(graph => {
                graph["@graph"].forEach(node => {
                    if (node["qudt:numericValue"]) {
                        let serie = series[node["@id"]];
                        if (!serie) {
                            serie = series[node["@id"]] = {t: 0, x: 0, v: 0, a: 0};
                        }
                        StreamingService.computeNextFakeValue(serie);
                        node["qudt:numericValue"]["@value"] = serie.x;
                    }
                    if (node["ssn:startTime"]) {
                        node["ssn:startTime"]["@value"] = new Date().toISOString();
                    }
                });
                this.timeout(() => callback(graph), 0);
            });
        }, 2000);
        return {
            isActive: function() {
                return active;
            },
            stop: function() {
                if (active) {
                    active = false;
                    interval.cancel(intervalResult);
                }
            }
        }
    }

    private static computeNextFakeValue(serie: any) {
        serie.v += serie.a;
        serie.x += serie.v;
        serie.a = Math.random()*10 - 5;
        if (serie.x < 0) {
            serie.x = 0;
            serie.v = 0;
        }
    }
}