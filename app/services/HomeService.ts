import IHttpPromise = angular.IHttpPromise;
export class HomeService {
    private http:ng.IHttpService;
    private log:ng.ILogService;

    constructor($http, $log){
        "ngInject";
        this.http = $http;
        this.log = $log;
    }

    public getData() : any {
        //return this.http.get('/api/123');
        return this.http.get('/assets/data/data.json');
    }

    public getSectorLabel(label){
        return this.sectorLabels[label];
    }

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

    public getNewEntry():any {
        let newEntry = {
            "@graph": [
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Hubies_Haut"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Louveciennes"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Ville_Nouvelle"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Pierrier_Laval"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Guyancourt_Detendu"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Satory"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_05-06_-_Courbevoie_La_Defense"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Hubies_Detendu"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_02_-_Gennevilliers"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_03_-_Asnieres"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_08_-_Nanterre_Sud"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_09_-_Haut-Service"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_10_-_Buzenval_3eme_Elevation"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_11_-_Mt_Valerien_3eme_Elevation"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_12_-_Suresnes"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:SECTEUR_14_-_Surpresse"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Brezin"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Garches"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Gobert"
                    }
                },
                {
                    "qudt:numericValue": {
                        "@type": "xsd:double",
                    },
                    "waves:relatedSector": {
                        "@id": "waves:Haut-Clagny"
                    }
                },
                {
                    "@id": "S-3f:12v",
                    "@type": "waves:Event",
                    "waves:time": {
                        "@type": "xsd:dateTime",
                    }
                }
            ]
        };

        newEntry['@graph'].forEach((sector) => {
            if(sector['qudt:numericValue']) {
                sector['qudt:numericValue']['@value'] = Math.random() * 4000
            }
        });

        newEntry['@graph'][newEntry['@graph'].length -1]['waves:time']["@value"] = new Date();

        return newEntry;
    }
}