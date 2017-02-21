import {VisualisationConfig} from "../VisualisationConfig";

export class LineChartConfig extends VisualisationConfig{
    private _series: Serie[];
    
    get series(): Serie[] {
        return this._series;
    }
    
    set series(value: Serie[]) {
        this._series = value;
    }
    
    constructor(visuName?: string, series?: Serie[]) {
        super(visuName);
        this._series = series;
    }
}

class Serie {
    id: string;
    color: string;
}