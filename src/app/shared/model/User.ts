import { Branch } from './';

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
	public branch_id: string;
	public branch: Branch;
	public created_at: string;
	public updated_at: string;

	// TODO Cambiar estos a inglés.
	public colonia: string;
	public cp: string;
	public municipio: string;
	public estado: string;
	public pais: string;
	//

	public static NO_USER_PATH = 'images/default-user-image.png';
	public static KIND_ADMIN = 'a';
	public static KIND_SUPERVISOR = 's';
	public static KIND_AGENT = 'u';
	public static KIND_PARTNER = 'p';

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
		this.branch_id = obj && obj.branch_id || null;
		this.branch = obj && obj.sucursal || null;
		this.created_at = obj && obj.created_at || null;
		this.updated_at = obj && obj.updated_at || null;

		this.colonia = obj && obj.colonia || '';
		this.cp = obj && obj.cp || '';
		this.municipio = obj && obj.municipio || '';
		this.estado = obj && obj.estado || '';
		this.pais = obj && obj.pais || '';
	}

	get full_name() {
		return `${this.name} ${this.first_surname} ${this.last_surname}`;
	}

	get kind_full() {
		switch(this.kind) {
            case 'a': return 'Administrador';
            case 'u': return 'Agente';
            case 's': return 'Supervisor';
            case 'p': return 'Partner';
		}
	}
}
