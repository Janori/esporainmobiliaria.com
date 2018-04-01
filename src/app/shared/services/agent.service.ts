import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from './';
import 'rxjs/add/operator/map';

@Injectable()
export class AgentService extends UserService {

    constructor(
        public http: Http
    ) {
      super(http);
    }

    getAllAgents = () => {
        let headers = this.headers();
        return this.http.get(this.url + 'user/kind/u', { headers })
			             .map(res => res.json());
    }

    getChartData() {
        let headers = this.headers();

        return this.http.get(this.url + 'home', { headers })
                   .map(res => res.json());
    }

}
