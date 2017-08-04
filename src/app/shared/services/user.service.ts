import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './Service';
import { User } from '../model';
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

    getAllByKind = (kind: string) => {
        let headers = this.headers();
        return this._http.get(this.url + 'user/kind/' + kind, { headers })
			             .map(res => res.json());
    }

    getUser = (id: Number) => {
        let headers = this.headers();
        return this._http.get(this.url + 'user/' + id, { headers })
			             .map(res => res.json());
    }

    createUser = (user: User) => {
        let params  = JSON.stringify(user);
        let headers = this.headers();

        return this._http.post(this.url + 'user', params, { headers })
                         .map(res => res.json());
    }

    editUser = (id: Number, user: User) => {
        let params  = JSON.stringify(user);
        let headers = this.headers();

        return this._http.put(this.url + 'user/' + id, params, { headers })
                         .map(res => res.json());
    }

    changePassword = (id: Number, password: string) => {
        let params  = JSON.stringify({password: password});
        let headers = this.headers();

        return this._http.put(this.url + 'user/change-password/' + id, params, { headers })
                         .map(res => res.json());
    }


    deleteUser = (id: Number) => {
        let headers = this.headers();
        return this._http.delete(this.url + 'user/' + id, { headers })
                         .map(res => res.json());
    }
}
