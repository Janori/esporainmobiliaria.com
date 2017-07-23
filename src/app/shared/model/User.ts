export class User {
	public id: Number;
	public name: string;
	public username: string;
	public email: string;
	public password : string;
	public remember_token: string;
	public img_path: string;
	public first_surname: string;
	public last_surname: string;
	public gender: string;
	public mariage_status: string;
	public address: string;
	public kind: string;
	public created_at: string;
	public updated_at: string;

	public static NO_USER_PATH = 'images/default-user-image.png';

	constructor(obj?: any) {
		this.id = obj && obj.id || 0;
		this.name = obj && obj.name || '';
		this.username = obj && obj.username || '';
		this.email = obj && obj.email || '';
		this.password  = obj && obj.password || '';
		this.remember_token = null;
		this.img_path = obj && obj.img_path || User.NO_USER_PATH;
		this.first_surname = obj && obj.first_surname || '';
		this.last_surname = obj && obj.last_surname || '';
		this.gender = obj && obj.gender || '';
		this.mariage_status = obj && obj.mariage_status || '';
		this.address = obj && obj.address || '';
		this.kind = obj && obj.kind || '';
		this.created_at = obj && obj.created_at || null;
		this.updated_at = obj && obj.updated_at || null;
	}
}
