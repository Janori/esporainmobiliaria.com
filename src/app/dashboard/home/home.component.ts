import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/User';

declare var lscache: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public user: User;

    constructor() {
        this.user = lscache.get('user');
    }

    ngOnInit() {
    }

}
