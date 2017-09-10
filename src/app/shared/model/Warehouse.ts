export class Warehouse {
    public id: number;
    public is_new: boolean;
    public build_surface: number;
    public building_date: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.is_new = obj && obj.is_new || 0;
        this.build_surface = obj && obj.build_surface || 0;
        this.building_date = obj && obj.building_date || null;
    }
}
