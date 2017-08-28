import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../shared/model/User';
import { AuthService } from '../shared/security/auth.service';

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
  providers: [ AuthService ],
})

export class DashboardComponent implements OnInit {
    public user: User;
    public url: string;

    constructor(private _authService: AuthService) {
    }

    ngOnInit() {
        this.user = new User(lscache.get('user'));
        this.url = this._authService.url.replace('/api/', '') + '/';
        $('body').attr('class', 'page-container-bg-solid page-header-fixed page-sidebar-closed-hide-logo');
    }

    doLogout = () => {
        this._authService.logout();
    }

    doLockscreen = () => {
        lscache.set('lock', true);
        this._authService.lockscreen();
    }

}
