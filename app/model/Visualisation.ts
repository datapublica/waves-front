import {VisualisationConfig} from "./VisualisationConfig";
import {Stream} from "./Stream";
import {VisualisationTypeEnum} from "./VisualisationType";

export class Visualisation <Config extends VisualisationConfig>{
    
    private _type: VisualisationTypeEnum;
    private _stream: Stream;
    private _config: Config;
    
    
    constructor(type?: VisualisationTypeEnum, stream?: Stream, config?: Config) {
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
    
    get type(): VisualisationTypeEnum {
        return this._type;
    }
    
    set type(value: VisualisationTypeEnum) {
        this._type = value;
    }
    
    get stream(): Stream {
        return this._stream;
    }
    
    set stream(value: Stream) {
        this._stream = value;
    }
}