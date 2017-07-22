export class User {
	public id: Number;
	public status: string;
	public name: string;
	public first_surname: string;
	public second_surname: string;
	public email: string;
	public password : string;
	public created_at: string;
	public updated_at: string;

	constructor(obj?: any) {
		this.id = obj && obj.id || 0;
		this.status = obj && obj.status || 'Activo';
		this.name = obj && obj.name || '';
		this.first_surname = obj && obj.first_surname || '';
		this.second_surname = obj && obj.second_surname || '';
		this.email = obj && obj.email || '';
		this.password  = obj && obj.password || '';
		this.created_at = obj && obj.created_at || null;
		this.updated_at = obj && obj.updated_at || null;
	}
}
