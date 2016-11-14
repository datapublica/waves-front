
/**
 * The s3f controller for the app
 */
export class S3fController {
    sensors: any[];
    
    constructor(context: any) {
        "ngInject";
        var ctrl = this;
        ctrl.sensors = context.data['@graph'] && context.data['@graph'].filter(s => s['@type'] === 'http://purl.oclc.org/NET/ssnx/ssn#Sensor');
    
    
        // WebSocket
    
        var client = new WebSocket('ws://localhost:3000/ws/54', 'echo-protocol');
        client.onerror = function() {
            console.log('Connection Error');
        };
    
        client.onopen = function() {
            console.log('WebSocket Client Connected');
        };
    
        client.onclose = function() {
            console.log('echo-protocol Client Closed');
        };
    
        client.onmessage = (e) => {
            console.log(e);
        };
    }
}