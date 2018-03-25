import { Land, Warehouse, Office, House, Customer, User } from './';

export class Building {
    public id: number;
    public land_id: number;
    public land: Land;
    public warehouse_id: number;
    public warehouse: Warehouse;
    public office_id: number;
    public office: Office
    public house_id: number;
    public house: House;
    public images: Array<any>;
    public extra_data: string;
    public address: string;
    public created_at: string;
	public updated_at: string;
    public customer_id: number;
    public customer: Customer;
    public user_id: number;
    public user: User;

    public type: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.land_id = obj && obj.land_id || null;
        this.land = obj && new Land(obj.land) || new Land();
        this.warehouse_id = obj && obj.warehouse_id || null;
        this.warehouse = obj && new Warehouse(obj.warehouse) || new Warehouse();
        this.office_id = obj && obj.office_id || null;
        this.office = obj && new Office(obj.office) || new Office();
        this.house_id = obj && obj.house_id || null;
        this.house = obj && new House(obj.house) || new House();
        this.images = obj && obj.images || [];
        this.extra_data = obj && obj.extra_data || null;
        this.created_at = obj && obj.created_at || null;
    	this.updated_at = obj && obj.updated_at || null;
        this.type = obj && obj.type || null;
        this.address = obj && obj.address || '';

        this.customer_id = obj && obj.customer_id || null;
        this.user_id = obj && obj.user_id || null;

        this.customer = obj && 'customer' in obj ? new Customer(obj.customer) : null;
        this.user = obj && 'user' in obj ? new User(obj.user) : null;
    }

    get kind() {
        if(this.house_id != null)
            return 'Casa';

        if(this.office_id != null)
            return 'Oficina';

        if(this.warehouse_id != null)
            return 'Almacén';

        return 'Terreno';
    }

    set kind(type: string) {
        switch(type) {
            case 'Terreno':
                this.warehouse = null;
                this.warehouse_id = null;
                this.office = null;
                this.office_id = null;
                this.house = null;
                this.house_id = null;
                break;
            case 'Almacen':
                this.warehouse_id = -1;
                this.warehouse = new Warehouse();
                this.office = null;
                this.office_id = null;
                this.house = null;
                this.house_id = null;
                break;
            case 'Oficina':
                if(this.warehouse_id == null) {
                    this.warehouse_id = -1;
                    this.warehouse = new Warehouse();
                }
                this.office_id = -1;
                this.office = new Office();
                this.house = null;
                this.house_id = null;
                break;
            case 'Casa':
                if(this.warehouse_id == null) {
                    this.warehouse_id = -1;
                    this.warehouse = new Warehouse();
                }

                if(this.office_id == null) {
                    this.office_id = -1;
                    this.office = new Office();
                }
                this.house_id = -1;
                this.house = new House();
        }
    }

    get disposition() {
        if(this.land.for_sale)
            return 'Venta';
        return 'Renta';
    }

    get price() {
        return parseFloat("" + this.land.price).toFixed(2);
    }

    get isAvailable(): boolean {
        return this.customer_id == null; 
    }
}
