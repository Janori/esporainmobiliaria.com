import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { User } from '../model/User';

import { Service } from './Service';

declare var lscache: any;

@Injectable()

export class AuthService extends Service {
	constructor(
		private _http: Http,
		private _router: Router
	) {
		super();
	}

    isLoggedIn = () => {
        return !!lscache.get('user');
    }

	login = (user: User) => {
		let params = JSON.stringify(user);
		let headers = new Headers({'Content-Type' : 'application/json'});

		return this._http.post(this.url + 'authenticate', params, {headers: headers})
						 .map(res => res.json());
    }

	logout = () => {
        lscache.remove("user");
		this._router.navigate(['login']);
	}
}
