import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models';
import * as AppUtils from '../../utils/app.utils';

@Injectable()
export class NoneAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log("canActive - " + sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT));
        let user: User = JSON.parse(sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT));
        if (user) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}