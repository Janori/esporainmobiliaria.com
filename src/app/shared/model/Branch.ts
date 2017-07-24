import { User } from './';

export class Branch {
    public id: Number;
    public name: string;
    public location_id: Number;
    public location: any; // TODO
    public user_id: Number;
    public user: User;
    public active: Number;
    public extra_data: string;
    public created_at: string;
	public updated_at: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.name = obj && obj.name || '';
        this.location_id = obj && obj.location_id || 0;
        this.location = obj && obj.location || null
        this.user_id = obj && obj.user_id || Number;
        this.user = obj && obj.user || null;
        this.active = obj && obj.active || 0;
        this.extra_data = obj && obj.extra_data || '';
        this.created_at = obj && obj.created_at || null;
    	this.updated_at = obj && obj.updated_at || null;
    }
}
