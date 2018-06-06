import { Component } from '@angular/core';

import * as AppUtils from '../utils/app.utils';
import { User } from '../registration-login/_models';
import { AuthenticationService } from '../registration-login/_services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    title: 'Header';
    currentUser: User = null;

    isRoot: boolean;
    isAdmin: boolean;

    constructor(private router: Router,private authenticationService: AuthenticationService) {
        authenticationService.loggedInOutEvent.subscribe(
            event => this.preInit()
        );
        this.preInit();
    }

    preInit() {
        this.currentUser = JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT));
        if (this.currentUser) {
            this.isRoot = AppUtils.Utilities.isRoot(this.currentUser);
            this.isAdmin = AppUtils.Utilities.isAdmin(this.currentUser);
        } else {
            this.isRoot = false;
            this.isAdmin = false;
        }
    }

    goto(link: string) {
        this.router.navigateByUrl(link);
    }
}