import {HomeService} from "../../services/HomeService";
/**
 * The homepage controller for the app. The controller:
 * - display a <hello world> message
 */
export class HomepageController {
    public helloWorld: string;
    public chartData: any = {};
    public data: any;
    public sectors: string[] = [];

    constructor(data){
        "ngInject";
        this.data = data;
        let firstEntry = this.data.data[0]['@graph'];
        for(let i = 0; i < 8; i++){
            //this.sectors.push(firstEntry[i]['waves:relatedSector']['@id'].replace(/waves:/, ''));
            if(firstEntry[i]['waves:relatedSector']) {
                this.sectors.push(firstEntry[i]['waves:relatedSector']['@id']);
            }
        }
        this.data.data.forEach((entry, index) => {
            this.sectors.forEach((sector1) => {
                this.sectors.forEach((sector2) => {
                    let timestamp = entry['@graph'].filter((input) => {
                        return input['@type'] === "waves:Event";
                    })[0]['waves:time']['@value'];
                    var combinedName = sector1+'&&&'+sector2;
                    if(angular.isUndefined(this.chartData[combinedName])){
                        this.chartData[combinedName] = [];
                    }

                    this.chartData[combinedName].push({
                        timestamp: timestamp
                    });
                    entry['@graph'].forEach((input) => {
                        if(input['waves:relatedSector']) {
                            var sector = input['waves:relatedSector']['@id'];

                            if (sector === sector1) {
                                this.chartData[combinedName][index].x = input['qudt:numericValue']['@value']
                            }
                            if (sector === sector2) {
                                this.chartData[combinedName][index].y = input['qudt:numericValue']['@value']
                            }
                        }
                    })
                });
            });
        });
        console.log(this.chartData);
    }
}