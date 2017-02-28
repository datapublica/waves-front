import {VisualisationConfig} from "../VisualisationConfig";

export class MapChartConfig extends VisualisationConfig{
    
    public color;
    public size;
    public unit;
    
    constructor(visuName?: string, unit?: string, color?: string, size?: string) {
        super(visuName);
        this.color = color;
        this.size = size;
        this.unit = unit;
    }
}