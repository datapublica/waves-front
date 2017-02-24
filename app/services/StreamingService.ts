import IHttpPromise = angular.IHttpPromise;
export class StreamingService {
    private http:ng.IHttpService;
    private log:ng.ILogService;
    private timeout: ng.ITimeoutService;

    constructor($http, $log, $timeout){
        "ngInject";
        this.http = $http;
        this.timeout = $timeout;
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
            getClient: function() {
                return client;
            },
            isActive: function() {
                return websocketActive;
            },
            stop: function() {
                client.close();
            }
        }
    }
}