import {SectorService} from "../../services/SectorService";

/**
 * The s3f controller for the app. The controller:
 * - display a <hello world> message
 */
export class S3fController {
    public helloWorld: string;
    private SectorService: SectorService;
    public chartData: any = {};
    public data: any;
    public sectors: string[] = [];
    public newEntry: any;
    public yesterday: Date;
    public today: Date;
    public medianDate: Date;

    constructor($scope: ng.IScope, SectorService: SectorService, data: any){
        "ngInject";
        this.data = data.data;
        if(this.data.length !== 0 ){
            this.SectorService = SectorService;
            let firstEntry = this.data[0]['@graph'];
            const NB_SECTORS = Math.min(5, firstEntry.length);
            for(let i = 0; i < NB_SECTORS; i++){
                if(firstEntry[i]['waves:relatedSector']) {
                    this.sectors.push(firstEntry[i]['waves:relatedSector']['@id']);
                }
            }
            var lastEntryGraph = this.data[this.data.length - 1]['@graph'];
            this.today = new Date(lastEntryGraph[lastEntryGraph.length - 1]['waves:time']['@value']);
            let buff: Date = angular.copy(this.today);
            this.yesterday = new Date(buff.setDate(buff.getDate() - 2));
            this.medianDate = new Date(buff.setDate(buff.getDate() +1));

            this.data.forEach((entry, index) => {
                this.sectors.forEach((sector1) => {
                    this.sectors.forEach((sector2) => {
                        let timestamp = entry['@graph'].filter((input) => {
                            return input['@type'] === "waves:Event";
                        })[0]['waves:time']['@value'];
                        var combinedName = SectorService.getSectorLabel(sector1)+'_'+SectorService.getSectorLabel(sector2);
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
        }

        var client = new WebSocket('ws://localhost:3000/ws/123', 'echo-protocol');
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
            this.newEntry = JSON.parse(e.data)['@graph'];
            this.today = new Date(this.newEntry[this.newEntry.length - 1]['waves:time']['@value']);
            let buff = angular.copy(this.today);
            this.yesterday = new Date(buff.setDate(buff.getDate() - 2));
            this.medianDate = new Date(buff.setDate(buff.getDate() +1));
            $scope.$apply();
        };
    }
}