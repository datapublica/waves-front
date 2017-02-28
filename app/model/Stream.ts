export class Stream {
    public type: string;
    public label: string;
    public id: number;
    
    
    constructor(type: string, label: string, id: number) {
        this.type = type;
        this.label = label;
        this.id = id;
    }
}