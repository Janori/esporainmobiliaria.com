export class Warehouse {
    public id: Number;
    public is_new: Number;
    public build_surface: Number;
    public building_date: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.is_new = obj && obj.is_new || 0;
        this.build_surface = obj && obj.build_surface || 0;
        this.building_date = obj && obj.building_date || null;
    }
}
