import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private _authService:AuthService, private _router:Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this._authService.isLoggedIn()) {
            if(this._authService.isLocked()) {
                this._router.navigate(['lockscreen']);
                return false;
            }
            return true;
        }

        this._router.navigate(['login']);
        return false;
    }

}
