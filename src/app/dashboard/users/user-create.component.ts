import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../shared/services';
import { User } from '../../shared/model/User';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-form.component.html',
    styleUrls: [ '../../../assets/pages/css/profile.min.css' ],
    encapsulation: ViewEncapsulation.None,
    providers: [ UserService ]
})

export class UserCreateComponent implements OnInit {
    public user: User;
    public url: string;

    constructor(
        private _userService: UserService
    ) {
        this.user = new User();
        this.url = this._userService.url.replace('/api/', '') + '/';
    }

    ngOnInit() {
    }

}
