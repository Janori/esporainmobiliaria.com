import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './Service';
import { Building } from '../model/';
import 'rxjs/add/operator/map';

@Injectable()
export class BuildingService extends Service {
    constructor(
        private _http: Http
    ) {
        super();
    }

    getAllBuildings = () => {
        let headers = this.headers();
        return this._http.get(this.url + 'building', { headers })
                         .map(res => res.json());
    }

    getBuilding = (id: Number) => {
        let headers = this.headers();
        return this._http.get(this.url + 'building/' + id, { headers })
                         .map(res => res.json());
    }

    createBuilding = (Building: Building) => {
        let params  = JSON.stringify(Building);
        let headers = this.headers();

        return this._http.post(this.url + 'building', params, { headers })
                         .map(res => res.json());
    }

    editBuilding = (id: Number, Building: Building) => {
        let params  = JSON.stringify(Building);
        let headers = this.headers();

        return this._http.put(this.url + 'building/' + id, params, { headers })
                         .map(res => res.json());
    }


    deleteBuilding = (id: Number) => {
        let headers = this.headers();
        return this._http.delete(this.url + 'building/' + id, { headers })
                         .map(res => res.json());
    }

    deleteImage = (id: number) => {
        let headers = this.headers();
        return this._http.delete(this.url + 'building/delete-image/' + id, { headers })
                         .map(res => res.json());
    }
}
