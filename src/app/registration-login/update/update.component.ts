import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models';

@Component({
    moduleId: module.id,
    templateUrl: 'update.component.html'
})

export class UpdateComponent implements OnInit {
    currentUser: User;
    
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    ngOnInit() {
        this.model = this.currentUser;
        console.log("update component");
    }

    update() {
        this.loading = true;
        this.userService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
                    this.router.navigate(['login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
