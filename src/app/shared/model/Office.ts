export class Office {
    public id: Number;
    public baths: Number;
    public parkings: Number;
    public yards: Number;
    public kind: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.baths = obj && obj.baths || 0;
        this.parkings = obj && obj.parkings || 0;
        this.yards = obj && obj.yards || 0;
        this.kind = obj && obj.kind || 'l';
    }
}
