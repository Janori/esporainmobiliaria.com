import { User } from './User';

export class Sale {
    public id: number;
    public building_id: number;
    public user_id: number;
    public user: User;
    public sale_date: string;
    public amount: number;
    public customer_id: number;
    public extra_data: string;
    public created_at: string;
    public updated_at: string;

    constructor(obj ?: any) {
        this.id = obj && obj.id || null;
        this.building_id = obj && obj.building_id || null;
        this.user_id = obj && obj.user_id || null;
        this.sale_date = obj && obj.sale_date || null;
        this.amount = obj && obj.amount || 0;
        this.customer_id = obj && obj.customer_id || null;
        this.extra_data = obj && obj.extra_data || null;
        this.created_at = obj && obj.created_at || null;
        this.updated_at = obj && obj.updated_at || null;

        this.user = obj && 'user' in obj ? new User(obj.user) : null;
    }
}
