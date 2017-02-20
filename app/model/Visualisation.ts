import {VisualisationConfig} from "./VisualisationConfig";
import {Stream} from "./Stream";

type VisualisationType = "MAPCHART" | "LINECHART";

export class Visualisation <Config extends VisualisationConfig>{
    
    private _type: VisualisationType;
    private _stream: Stream;
    private _config: Config;
    
    
    constructor(type?: VisualisationType, stream?: Stream, config?: Config) {
        this._type = type;
        this._stream = stream;
        this._config = config;
    }
    
    get config(): Config {
        return this._config;
    }
    
    set config(value: Config) {
        this._config = value;
    }
    
    get type(): VisualisationType {
        return this._type;
    }
    
    set type(value: VisualisationType) {
        this._type = value;
    }
    
    get stream(): Stream {
        return this._stream;
    }
    
    set stream(value: Stream) {
        this._stream = value;
    }
}