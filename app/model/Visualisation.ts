import {VisualisationConfig} from "./VisualisationConfig";
import {Stream} from "./Stream";
import {VisualisationTypeEnum} from "./VisualisationType";

export class Visualisation <Config extends VisualisationConfig>{
    
    public type: VisualisationTypeEnum;
    public stream: Stream;
    public config: Config;
    
    
    constructor(type?: VisualisationTypeEnum, stream?: Stream, config?: Config) {
        this.type = type;
        this.stream = stream;
        this.config = config;
    }
}