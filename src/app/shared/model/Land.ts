import { Location } from './';

export class Land {
    public id: Number;
    public for_sale: Number;
    public location_id: Number;
    public location: Location;
    public price: Number;
    public surface: Number;
    public predial_cost: Number;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.for_sale = obj && obj.for_sale || 0;
        this.location_id = obj && obj.location_id || null;
        this.location = obj && new Location(obj.location) || new Location();
        this.price = obj && obj.price || 0.00;
        this.surface = obj && obj.surface || 0.00;
        this.predial_cost = obj && obj.predial_cost || 0.00;
    }

}
