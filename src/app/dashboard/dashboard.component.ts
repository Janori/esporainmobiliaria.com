import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../shared/model/User';
import { AuthService } from '../shared/security/auth.service';
import { BuildingService } from '../shared/services/building.service';

declare var $: any;
declare var lscache: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
      '../../assets/layout/css/layout.min.css',
      '../../assets/layout/css/themes/default.min.css',
      '../../assets/layout/css/custom.min.css',
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ AuthService, BuildingService ],
})

export class DashboardComponent implements OnInit {
    public user: User;
    public url: string;

    constructor(
        private _authService: AuthService,
        private _buildingService: BuildingService) {
    }

    ngOnInit() {
        this.user = new User(lscache.get('user'));
        this.url = this._authService.url;
        $('body').attr('class', 'page-container-bg-solid page-header-fixed page-sidebar-closed-hide-logo');
    }

    doLogout = () => {
        this._authService.logout();
    }

    doLockscreen = () => {
        lscache.set('lock', true);
        this._authService.lockscreen();
    }

    ZIPCodeTendency() {
        var self = this;
        bootbox.prompt({
            size: 'small',
            title: "Ingresa el código postal a buscar",
            inputType: 'number',
            buttons: {
                confirm: {
                label: 'Aceptar',
                className: 'btn-primary'
                },
                    cancel: {
                    label: 'Cancelar',
                    className: 'btn-default'
                }
            },
            callback: function(result) {
                self._buildingService.getTendency(parseInt(result)).subscribe(
                    result => {
                        if(result.status)
                            bootbox.alert(result.msg);
                        else
                            toastr.error(result.msg, '¡Error!');
                    },
                    error => {
                        console.log(error);
                        toastr.error('Hay un error en la petición', '¡Error!');
                    }
                );
            }
        });
    }

}
