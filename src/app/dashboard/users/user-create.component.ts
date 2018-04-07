import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../shared/services';
import { User } from '../../shared/model/User';

declare var bootbox: any;

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
        private _userService: UserService,
        private _router: Router
    ) {
        this.user = new User();
        this.url = this._userService.url.replace('/api/', '') + '/';
    }

    ngOnInit() {
    }

    onSubmit = () => {
		this._userService.createUser(this.user).subscribe(
			response => {
                bootbox.alert(response.msg);
                this._router.navigate(['/usuarios']);
			},
			error => {
				console.log(error);
			    toastr.error('Hay un error en la petición', '¡Error!');
			}
		);
    }

}
