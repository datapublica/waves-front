import {VisualisationConfig} from "../VisualisationConfig";

export class LineChartConfig extends VisualisationConfig{
    public series: Serie[];
    
    
    constructor(visuName?: string, series?: Serie[]) {
        super(visuName);
        this.series = series;
    }
}

export class Serie {
    sensor: any;
    metric: any;
    lineType: string;
    color: {hex: string};
    strokeWidth: number;
}