import { User, Location } from './';

export class Branch {
    public id: Number;
    public name: string;
    public location_id: Number;
    public location: Location
    public user_id: Number;
    public user: User;
    public users: User[];
    public active: Number;
    public extra_data: string;
    public created_at: string;
	public updated_at: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.name = obj && obj.name || '';
        this.location_id = obj && obj.location_id || 0;
        this.location = obj && new Location(obj.location) || new Location();
        this.user_id = obj && obj.user_id || 0;
        this.user = obj && new User(obj.user) || new User();
        this.users = obj && obj.users || [];
        this.active = obj && obj.active || 0;
        this.extra_data = obj && obj.extra_data || '';
        this.created_at = obj && obj.created_at || null;
    	this.updated_at = obj && obj.updated_at || null;
    }
}
