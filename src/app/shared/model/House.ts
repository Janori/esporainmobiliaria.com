export class House {
    public id: Number;
    public rooms: Number;
    public kind: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.rooms = obj && obj.rooms || 0;
        this.kind = obj && obj.kind || 'c';
    }
}
