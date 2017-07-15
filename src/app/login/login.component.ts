import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/pages/css/login-2.min.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

    constructor(
        // private _authService : AuthService,
        private _router: Router
    ) {
        // this.user = new User();
        //this.loading = true;
    }

  ngOnInit() {
      $('body').attr('class', 'login');
  }

  onSubmit = () => {
      this._router.navigate(['/']);
  }
}
