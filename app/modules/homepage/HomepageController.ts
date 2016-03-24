import {HomeService} from "../../services/HomeService";
/**
 * The homepage controller for the app. The controller:
 * - display a <hello world> message
 */
export class HomepageController {
    public helloWorld: string;
    private HomeService: HomeService;
    public chartData: any = {};
    public data: any;
    public sectors: string[] = [];
    public newEntry: any;

    constructor(HomeService: HomeService, $interval:ng.IIntervalService, data: any){
        "ngInject";
        this.data = data;
        this.HomeService = HomeService;
        let firstEntry = this.data.data[0]['@graph'];
        const NB_SECTORS = 10;
        for(let i = 0; i < NB_SECTORS; i++){
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
                    var combinedName = HomeService.getSectorLabel(sector1)+'_'+HomeService.getSectorLabel(sector2);
                    if(angular.isUndefined(this.chartData[combinedName])){
                        this.chartData[combinedName] = [];
                    }

                    this.chartData[combinedName].push({
                        timestamp: timestamp
                    });
                    entry['@graph'].forEach((input) => {
                        if(input['waves:relatedSector']) {
                            var sector = input['waves:relatedSector']['@id'];

                            if (sector === sector2) {
                                this.chartData[combinedName][index].x = input['qudt:numericValue']['@value']
                            }
                            if (sector === sector1) {
                                this.chartData[combinedName][index].y = input['qudt:numericValue']['@value']
                            }
                        }
                    })
                });
            });
        });

        //this.fetchNewData();
        $interval(this.fetchNewData,4000);

    }

    fetchNewData = () => {
        this.newEntry = this.HomeService.getNewEntry()['@graph'];
        //console.log(this.newEntry);
    }
}