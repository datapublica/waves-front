import IHttpPromise = angular.IHttpPromise;
export class SectorService {
    private http:ng.IHttpService;
    private log:ng.ILogService;

    constructor($http, $log){
        "ngInject";
        this.http = $http;
        this.log = $log;
    }

    public getS3fData() : any {
        return this.http.get('./api/123');
    }
    
    public getS1iData() : any {
        return this.http.get('./api/54');
    }

    public getS1iContext() : any {
        return this.http.get('./api/context');
    }

    public getSectorLabel(label){
        return this.sectorLabels[label];
    }
    
    public getUnits() {
        return this.units;
    }
    
    public getUnitLabel(unitId) {
        return this.units.filter(u => u.unit === unitId)[0].unitLabel
    }
    
    public extractAfterSharp(str: string) {
        return str.substring(str.indexOf("#") + 1);
    }
    
    private units = [
        {
            name: 'Chlorine',
            unit: 'MilligramPerLiter',
            unitLabel: 'mg / L'
        },
        {
            name: 'Input & Output Flow',
            unit: 'CubicMeterPerHour',
            unitLabel: 'm3/h'
        },
        {
            name: 'pH',
            unit: 'pH',
            unitLabel: 'pH'
        },
        {
            name: 'Pressure',
            unit: 'Bar',
            unitLabel: 'Bar'
        }
    ];

    private sectorLabels = {
        "waves:Brezin": "Brezin",
        "waves:SECTEUR_04_-_Colombes": "Colombes",
        "waves:SECTEUR_07_-_Nanterre_Nord": "Nanterre Nord",
        "waves:SECTEUR_05-06_-_Courbevoie_La_Defense": "Courbevoie La Defense",
        "waves:Guyancourt_Detendu": "Guyancourt Détendu",
        "waves:Pierrier_Laval": "Pierrier Laval",
        "waves:Louveciennes": "Louveciennes",
        "waves:Hubies_Detendu": "Hubies Détendu",
        "waves:Garches": "Garches",
        "waves:Gobert": "Gobert",
        "waves:Haut-Clagny": "Haut-Clagny",
        "waves:Hubies_Haut": "Hubies Haut",
        "waves:Satory": "Satory",
        "waves:Ville_Nouvelle": "Ville Nouvelle",
        "waves:SECTEUR_02_-_Gennevilliers": "Gennevilliers",
        "waves:SECTEUR_03_-_Asnieres": "Asnières",
        "waves:SECTEUR_08_-_Nanterre_Sud": "Nanterre Sud",
        "waves:SECTEUR_09_-_Haut-Service": "Haut-Service",
        "waves:SECTEUR_10_-_Buzenval_3eme_Elevation": "Buzenval 3ème Elévation",
        "waves:SECTEUR_11_-_Mt_Valerien_3eme_Elevation": "Mt Valérien 3éme Elevation",
        "waves:SECTEUR_12_-_Suresnes": "Suresnes",
        "waves:SECTEUR_14_-_Surpresse": "Surpressé",
        "waves:SECTEUR_01_-_Villeneuve": "Villeneuve"
    };
}