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

export class Serie {
    sensor: any;
    metric: any;
    lineType: string;
    color: {hex: string};
    strokeWidth: number;
}