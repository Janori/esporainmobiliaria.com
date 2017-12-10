import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { User } from '../model/User';

import { Service } from '../services/Service';

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

	isLocked = (): boolean => {
		return !!lscache.get('lock');
	}

	login = (user: User) => {
		let params = JSON.stringify(user);
		let headers = this.headers();

		return this._http.post(this.url + 'authenticate', params, {headers})
						 .map(res => res.json());
    }

	logout = () => {
        lscache.flush();
		this._router.navigate(['login']);
	}

	lockscreen = () => {
		this._router.navigate(['lockscreen']);
	}

	unlock = (password: string) => {
		let params = JSON.stringify({password: password});
		let headers = this.headers();

		return this._http.post(this.url + 'lockscreen', params, {headers})
						 .map(res => res.json());
	}
}
