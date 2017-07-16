import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../shared/User';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
      '../../assets/layout/css/layout.min.css',
      '../../assets/layout/css/themes/default.min.css',
      '../../assets/layout/css/custom.min.css',
  ],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
    public user: User;
    constructor() {
    }

    ngOnInit() {
        // TODO Hacer conexión con la BD para logear

        this.user = new User({
            name: 'Jonathan',
            fist_surname: 'Doe'
        });

        $('body').attr('class', 'page-container-bg-solid page-header-fixed page-sidebar-closed-hide-logo');
    }

}
