export class Service {
    public url: string;

    constructor() {
        if(!/localhost/.test(document.location.host))
            this.url = 'http://esporainmobiliaria.com/api/'; // prod
        else
            this.url = 'http://api.esporainmobiliara.local/public/api/'; // test
    }
}
