import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation';
import { UserService } from '../../shared/services';
import { User } from '../../shared/model/User';

declare var bootbox: any;

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-form.component.html',
    styleUrls: [ '../../../assets/pages/css/profile.min.css' ],
    encapsulation: ViewEncapsulation.None,
    providers: [ UserService ]
})

export class UserEditComponent implements OnInit {
    public user: User;
    public url: string;
    public passwordForm: FormGroup;

    constructor(
        private _userService: UserService,
        private _route : ActivatedRoute,
		private _router : Router,
        public fb: FormBuilder
    ) {
        this.passwordForm = fb.group({
            // define your control in you form
            password: ["", Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        })
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
                    console.log(this.user);
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

    changePassword = () => {
        this._route.params.forEach((params: Params) => {
			let id = params['id'];
            let password = this.passwordForm.get('password').value;

            this._userService.changePassword(id, password).subscribe(
                result => {
                    bootbox.alert(result.msg);
                },
                error => {
                    console.log(error);
				    alert('Hay un error en la petición');
                }
            );
        });
    }

}
