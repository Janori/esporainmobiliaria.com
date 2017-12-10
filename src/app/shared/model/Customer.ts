import { Prospect }  from './';

export class Customer {
    public id: number;
    public name: string;
    public first_surname: string;
    public last_surname: string;
    public gender: string;
    public mstatus: string;
    public address: string;
    public kind: string;
    public email: string;
    public prospect: Prospect;
    public file_path: string;
    // public user_id: string;
    public created_at: string;
    public updated_at: string;

    constructor(obj ?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || '';
        this.first_surname = obj && obj.first_surname || '';
        this.last_surname = obj && obj.last_surname || '';
        this.gender = obj && obj.gender || null;
        this.mstatus = obj && obj.mstatus || null;
        this.address = obj && obj.address || null;
        this.kind = obj && obj.kind || null;
        this.email = obj && obj.email || null;
        // this.user_id = obj && obj.user_id || null;
        this.created_at = obj && obj.created_at || null;
        this.updated_at = obj && obj.updated_at || null;
        this.file_path = obj && obj.file_path || null;
        this.prospect = obj && 'prospect' in obj ? new Prospect(obj.prospect) : new Prospect();
    }

    get full_name() {
        return `${this.name} ${this.first_surname} ${this.last_surname}`;
    }
}
