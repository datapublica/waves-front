import {VisualisationConfig} from "../VisualisationConfig";

export class MapChartConfig extends VisualisationConfig{
    
    private _color;
    private _size;
    private _unit;
    
    constructor(visuName?: string, unit?: string, color?: string, size?: string) {
        super(visuName);
        this._color = color;
        this._size = size;
        this._unit = unit;
    }
    
    
    get color() {
        return this._color;
    }
    
    set color(value) {
        this._color = value;
    }
    
    get size() {
        return this._size;
    }
    
    set size(value) {
        this._size = value;
    }
    
    get unit() {
        return this._unit;
    }
    
    set unit(value) {
        this._unit = value;
    }
}