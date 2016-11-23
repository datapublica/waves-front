import IHttpPromise = angular.IHttpPromise;
let metrics = {"throughput": "m/s", "cpu": "%", "memory": "MB", "latency": "ms"};

function randomData(min, max, n) {
    var res = Array(n);
    for(var i = 0 ; i < n ; i++)
        res[i] = Math.random()*(max-min)+min;
    return res;
}
function stats(latestPoints: number[]) {
    latestPoints = angular.copy(latestPoints);
    return {
        "95%": latestPoints.sort()[latestPoints.length - 2],
        "avg": latestPoints.reduce((a, b) => a + b) / latestPoints.length,
        "min": latestPoints.reduce((a,b) => Math.min(a,b)),
        "max": latestPoints.reduce((a,b) => Math.max(a,b))
    };
}
function generateDummyData() {
    var latestPoints = randomData(54, 12, 20);
    var aggregates = stats(latestPoints);
    return {latestPoints, aggregates};
}
function patchDummyData(data) {
    var newPoint = Math.random()*(54-12) + 12;
    data.latestPoints = data.latestPoints.slice(1);
    data.latestPoints.push(newPoint);
    data.aggregates = stats(data.latestPoints);
}
let origData:any = JSON.parse(<string>require("../assets/data/monitoring.json"));
export class MonitoringService {
    private http: ng.IHttpService;
    private log: ng.ILogService;

    constructor($http, $log) {
        "ngInject";
        this.http = $http;
        this.log = $log;
    }

    public getNetworkStatus() : any {
        for (var uri in origData) {
            Object.keys(metrics).forEach(m => {
                if (origData[uri][m]) {
                    patchDummyData(origData[uri][m]);
                } else {
                    origData[uri][m] = generateDummyData();
                }
            })
        }
        // give a fresh new copy to hide obvious changes
        return angular.copy(origData);
    }

    public getMetricsUnits(): Object {
        return metrics;
    }
}