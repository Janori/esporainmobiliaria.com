export class Location {
    public id: Number;
    public latitude: string;
    public longitude: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.latitude = obj && obj.latitude || null;
        this.longitude = obj && obj.longitude || null;
    }
}
