export class Stream {
    private _type: string;
    private _label: string;
    private _id: number;
    
    
    constructor(type: string, label: string, id: number) {
        this._type = type;
        this._label = label;
        this._id = id;
    }
    
    get type(): string {
        return this._type;
    }
    
    set type(value: string) {
        this._type = value;
    }
    
    get label(): string {
        return this._label;
    }
    
    set label(value: string) {
        this._label = value;
    }
    
    get id(): number {
        return this._id;
    }
    
    set id(value: number) {
        this._id = value;
    }
}