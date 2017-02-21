import {VisualisationConfig} from "../VisualisationConfig";

export class MapChartConfig extends VisualisationConfig{
    
    private pos;
    private color;
    private size;
    
    constructor(visuName?: string, pos?: string, color?: string, size?: string) {
        super(visuName);
        this.pos = pos;
        this.color = color;
        this.size = size;
    }
}