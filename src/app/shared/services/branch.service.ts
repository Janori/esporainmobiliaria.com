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

    getBranch = (id: Number) => {
        let headers = this.headers();
        return this._http.get(this.url + 'branch/' + id, { headers })
			             .map(res => res.json());
    }

    createBranch = (branch: any) => {
        let params  = JSON.stringify(branch);
        let headers = this.headers();

        return this._http.post(this.url + 'branch', params, { headers })
                         .map(res => res.json());
    }

    editBranch = (id: Number, branch: any) => {
        let params  = JSON.stringify(branch);
        let headers = this.headers();

        return this._http.put(this.url + 'branch/' + id, params, { headers })
                         .map(res => res.json());
    }

    deleteBranch = (id: Number) => {
        let headers = this.headers();
        return this._http.delete(this.url + 'branch/' + id, { headers })
                         .map(res => res.json());
    }

}
