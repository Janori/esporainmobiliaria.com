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
                this.options = result.data;
            },
            error => {
                console.log(error);
                alert('Hay un error en la petición');
            }
        );
    }
}
