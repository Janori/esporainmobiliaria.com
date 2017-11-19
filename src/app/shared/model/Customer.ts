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
    public user_id: string;
    public created_at: string;
    public updated_at: string;

    constructor(obj ?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.first_surname = obj && obj.first_surname || null;
        this.last_surname = obj && obj.last_surname || null;
        this.gender = obj && obj.gender || null;
        this.mstatus = obj && obj.mstatus || null;
        this.address = obj && obj.address || null;
        this.kind = obj && obj.kind || null;
        this.email = obj && obj.email || null;
        this.user_id = obj && obj.user_id || null;
        this.created_at = obj && obj.created_at || null;
        this.updated_at = obj && obj.updated_at || null;
    }
}
