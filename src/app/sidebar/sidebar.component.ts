import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public options: Array<any> = [];
    constructor() {
      this.setOptionsByType(2);
    }

    ngOnInit() {
    }

    setOptionsByType = (type) => {

        // TODO logica para el cambio de opciones según el rol.

        this.options.push({title: 'Inicio', icon: 'icon-rocket', url: '/'});
        this.options.push({title: 'Agentes', icon: 'icon-users', url: 'agentes'});
        this.options.push({title: 'Sucursales', icon: 'icon-briefcase', url: 'sucursales'});
        this.options.push({title: 'Inmuebles', icon: 'icon-home', url: 'inmuebles'});
        this.options.push({title: 'Prospectos', icon: 'icon-user-follow', url: 'prospectos'});
        this.options.push({title: 'Ventas', icon: 'icon-bar-chart', url: 'prospectos'});
        this.options.push({title: 'Geolocalización', icon: 'icon-pointer', url: 'geolocalización'});
    }

}
