import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './Service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService extends Service {
    constructor(
        private _http: Http
    ) {
        super();
    }

    getMenu = () => {
        let headers = this.headers();
        return this._http.get(this.url + 'user/menu', { headers })
			             .map(res => res.json());
    }

    getAllUsers = () => {
        let headers = this.headers();
        return this._http.get(this.url + 'user', { headers })
			             .map(res => res.json());
    }

    deleteUser = (id: Number) => {
        let headers = this.headers();
        return this._http.delete(this.url + 'user/' + id, { headers })
                         .map(res => res.json());
    }
}
