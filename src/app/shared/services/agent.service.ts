import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './Service';
import 'rxjs/add/operator/map';

@Injectable()
export class AgentService extends Service {

    constructor(
        private _http: Http
    ) {
      super();
    }

    getAllAgents = () => {
        let headers = this.headers();
        return this._http.get(this.url + 'agent', { headers })
			             .map(res => res.json());
    }

}
