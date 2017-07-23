import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../shared/model/User';
import { AuthService }from '../shared/security/auth.service';

declare var $:any;
declare var lscache:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/pages/css/login-2.min.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    public user: User;
    constructor(
        private _authService : AuthService,
        private _router: Router
    ) {
        this.user = new User();
    }

  ngOnInit() {
      $('body').attr('class', 'login');
  }

  onSubmit = () => {
      this._authService.login(this.user).subscribe(
          result => {
              console.log(result);
              let data = result.data;
              if(result.status) {
                  lscache.set('user', data.user, data.ttl);
                  lscache.set('authToken', data.token, data.ttl);
                  this._router.navigate(['/']);
              }
          },
          error => {
              return false;
          });
  }
}
