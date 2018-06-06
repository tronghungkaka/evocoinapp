import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models';

import * as AppUtils from '../../utils/app.utils';

@Component({
    moduleId: module.id,
    templateUrl: 'detail.component.html'
})

export class DetailComponent implements OnInit {
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
                        this.currentUser = res
                        this.model = this.currentUser;
                    }
                );
            } else {
                // this.currentUser = JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT));
                // this.model = this.currentUser;
            }
        }

    ngOnInit() {
        console.log(JSON.stringify(this.model))
    }

    update() {
        this.loading = true;
        // this.currentUser.fullName = this.model.fullname;
        // this.currentUser.password = this.model.newPassword;
        this.currentUser.role = this.model.role;
        this.userService.makeRole(this.currentUser)
            .subscribe(
                data => {
                    this.alertService.success('Make role successful', true);
                    this.router.navigate(['dasboard']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
