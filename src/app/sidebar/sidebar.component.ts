import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [ UserService ]
})
export class SidebarComponent implements OnInit {
    public options: Array<any> = [];
    constructor(
        private _userService: UserService
    ) {
    }

    ngOnInit() {
        this._userService.getMenu().subscribe(
            result => {
                console.log(result);
            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        );
    }
    //
    // setOptionsByType = (type) => {
    //
    //     // TODO logica para el cambio de opciones según el rol.
    //
    //     this.options.push({title: 'Inicio', icon: 'icon-rocket', url: ''});
    //     this.options.push({title: 'Agentes', icon: 'icon-users', url: 'agentes'});
    //     this.options.push({title: 'Sucursales', icon: 'icon-briefcase', url: 'sucursales'});
    //     this.options.push({title: 'Inmuebles', icon: 'icon-home', url: 'inmuebles'});
    //     this.options.push({title: 'Prospectos', icon: 'icon-user-follow', url: 'prospectos'});
    //     this.options.push({title: 'Ventas', icon: 'icon-bar-chart', url: 'ventas'});
    //     this.options.push({title: 'Geolocalización', icon: 'icon-pointer', url: 'geolocalización'});
    // }

}
