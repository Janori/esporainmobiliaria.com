import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public user: User;
    constructor() {
        this.user = new User({
            name: 'Jonathan',
            fist_surname: 'Doe'
        });
    }

    ngOnInit() {
    }

}
