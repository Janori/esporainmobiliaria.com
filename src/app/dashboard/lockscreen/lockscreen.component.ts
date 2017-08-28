import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../shared/security/auth.service';
import { User } from '../../shared/model';

declare var lscache: any;
declare var toastr: any;

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['../../../assets/pages/css/lock.min.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ AuthService ]
})

export class LockscreenComponent implements OnInit {
    public user: User;
    public url: string;

    public lockscreenForm: FormGroup;

    constructor(
      private _router: Router,
      private _authService: AuthService,
      public fb: FormBuilder
    ) {
        if(!this._authService.isLocked() || !this._authService.isLoggedIn()) {
            this._router.navigate(['login']);
        }

        this.lockscreenForm = fb.group({
            password: ["", Validators.required],
        });
    }

    ngOnInit() {
        $('body').attr('class', 'lock');
        this.url = this._authService.url.replace('/api/', '') + '/';
        this.user = new User(lscache.get('user'));
    }

    tryUnlock = () => {
        let password = this.lockscreenForm.get('password').value;
        this._authService.unlock(password).subscribe(result => {
            if(result.status) {
                lscache.set('lock', false);
                this._router.navigate(['/']);
            }
            else
                toastr.error('Error', result.msg);
        },
        error => {
            toastr.error('¡Error!', 'Hubo un error en el servidor');
            console.log(error);
        });
    }

}
