import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './Service';
import { Customer } from '../model/';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService extends Service {

    constructor(private _http: Http) { super(); }
    getAllCustomers = (kindCustomer: string) => {
        let headers = this.headers();

        return this._http.get(this.url + 'customer/' + kindCustomer, { headers })
                         .map(res => res.json());
    }

    createCustomer = (customer: Customer) => {
        let params  = JSON.stringify(customer);
        let headers = this.headers();

        return this._http.post(this.url + 'customer', params, { headers })
                         .map(res => res.json());
    }

    editCustomer = (id: Number, customer: Customer) => {
        let params  = JSON.stringify(customer);
        let headers = this.headers();

        return this._http.put(this.url + 'customer/' + id, params, { headers })
                         .map(res => res.json());
    }

    deleteCustomer = (id: Number) => {
        let headers = this.headers();
        return this._http.delete(this.url + 'customer/' + id, { headers })
                         .map(res => res.json());
    }

}
