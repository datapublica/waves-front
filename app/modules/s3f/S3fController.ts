
/**
 * The s3f controller for the app
 */
export class S3fController {
    sensors: any[];
    
    constructor(context: any) {
        "ngInject";
        var ctrl = this;
        ctrl.sensors = context.data['@graph'] && context.data['@graph'].filter(s => s['@type'] === 'http://purl.oclc.org/NET/ssnx/ssn#Sensor');
        console.log(ctrl.sensors);
    }
}