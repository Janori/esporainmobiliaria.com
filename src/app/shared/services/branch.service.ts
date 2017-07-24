import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './Service';
import 'rxjs/add/operator/map';

@Injectable()
export class BranchService extends Service {

    constructor(
        private _http: Http
    ) {
      super();
    }

    getAllBranches = () => {
        let headers = this.headers();
        return this._http.get(this.url + 'branch', { headers })
                         .map(res => res.json());
    }

}
