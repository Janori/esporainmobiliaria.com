import { Headers } from '@angular/http';

declare var lscache: any;

export class Service {
    public url: string;
    public test: boolean = false;

    constructor() {
        if(!this.test || !/localhost/.test(document.location.host))
            this.url = 'https://esporainmobiliaria.com/api/'; // prod
        else
            this.url = 'http://api.esporainmobiliaria.local/'; // test
    }

    headers = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        if(lscache.get('authToken') !== null)
            headers.append("Authorization", lscache.get('authToken'));
        return headers;

    }
}
