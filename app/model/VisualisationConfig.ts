/**
 * Abstract class of a simple visu config expended by specific chart configs (line charts, map charts,...)
 */

export abstract class VisualisationConfig {
    private _name: string;
    
    constructor(name?: string) {
        this._name = name;
    }
    
    get name(): string {
        return this._name;
    }
    
    set name(value: string) {
        this._name = value;
    }
}