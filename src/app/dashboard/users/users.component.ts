import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services';
import { User } from '../../shared/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [ UserService ]
})

export class UsersComponent implements OnInit {
    public users: User[];

    constructor(
      private _userService: UserService
    ) { }

    ngOnInit() {
      this._userService.getAllUsers().subscribe(
          result => {

          },
          error => {
              console.log(error);
              alert('Hay un error en la petición');
          }
      )
    }

}
