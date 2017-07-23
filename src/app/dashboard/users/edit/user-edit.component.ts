import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../shared/services';
import { User } from '../../../shared/model/User';

declare var bootbox: any;

@Component({
    selector: 'app-user-edit',
    templateUrl: '../user-form.component.html',
    styleUrls: [ '../../../../assets/pages/css/profile.min.css' ],
    encapsulation: ViewEncapsulation.None,
    providers: [ UserService ]
})

export class UserEditComponent implements OnInit {
    public user: User;
    public url: string;

    constructor(
        private _userService: UserService,
        private _route : ActivatedRoute,
		private _router : Router
    ) {
        this.user = new User();
        this.url = _userService.url.replace('/api/', '') + '/';
    }

    ngOnInit() {
        this.getUser();
    }

    getUser = () => {
        this._route.params.forEach((params : Params) => {
			let id = params['id'];

			this._userService.getUser(id).subscribe(
				result => {
                    if(!result.status)
                    	this._router.navigate(['/']);

                    this.user = new User(result.data);
				},
				error => {
					console.log(error);
					alert('Hay un error en la petición');
				}
			);
		});
    }

    onSubmit = () => {
        this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._userService.editUser(id, this.user).subscribe(
				response => {
                    bootbox.alert(response.msg);
                    this._router.navigate(['/usuarios']);
				},
				error => {
						console.log(error);
					    alert('Hay un error en la petición');
				}
			);
		});
    }

}
