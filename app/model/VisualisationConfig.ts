/**
 * Abstract class of a simple visu config expended by specific chart configs (line charts, map charts,...)
 */

export abstract class VisualisationConfig {
    public name: string;
    
    constructor(name?: string) {
        this.name = name;
    }
}