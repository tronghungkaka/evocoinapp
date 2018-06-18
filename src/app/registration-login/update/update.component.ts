import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models';

import * as AppUtils from '../../utils/app.utils';

@Component({
    moduleId: module.id,
    templateUrl: 'update.component.html'
})

export class UpdateComponent implements OnInit {
    currentUser: User;
    
    model: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
            let currentUserId = route.snapshot.params['userId'];
            if (currentUserId) {
                this.userService.getById(currentUserId).subscribe(
                    res => {
                        this.currentUser = res;
                        console.log(JSON.stringify(this.currentUser))
                        this.model = this.currentUser;
                    }
                );
            } else {
                this.currentUser = JSON.parse(sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT));
                console.log(JSON.stringify(this.currentUser));                
                this.model = this.currentUser;
            }
        }

    ngOnInit() {
        console.log("update component");
    }

    update() {
        this.loading = true;
        // this.currentUser.fullName = this.model.fullname;
        this.currentUser.password = this.model.newPassword;
        console.log(JSON.stringify(this.currentUser))
        this.userService.changePassword(this.currentUser)
            .subscribe(
                data => {
                    this.alertService.success('Change password successful', true);
                    this.router.navigate(['login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
