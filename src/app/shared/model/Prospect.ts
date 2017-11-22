import { Building, User, Customer } from './';

export class Prospect {
    public id: number;
    // public customer_id: number;
    // public customer: Customer;
    public building_id: number;
    public building: Building;
    public user_id: string;
    public user: User;
    public extra_data: string;
    public created_at: string;
    public updated_at: string;

	constructor(obj ?: any) {
        this.id = obj && obj.id || null;
        // this.customer_id = obj && obj.customer_id || null;
        this.building_id = obj && obj.building_id || null;
        this.user_id = obj && obj.user_id || null;
        this.extra_data = obj && obj.extra_data || null;
        this.created_at = obj && obj.created_at || null;
        this.updated_at = obj && obj.updated_at || null;

        // this.customer = obj && 'customer' in obj ? new Customer(obj.customer) : new Customer();
        this.building = obj && 'building' in obj ? new Building(obj.building) : null;
        this.user = obj && 'user' in obj ? new User(obj.user) : null;
    }
}
