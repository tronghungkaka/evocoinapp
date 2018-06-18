import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as AppUtils from '../../utils/app.utils';
import { User } from '../_models';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log("canActive - " + sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT));
        let user: User = JSON.parse(sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT));
        if (!user) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
            return false;
        }

        return true;
    }
}