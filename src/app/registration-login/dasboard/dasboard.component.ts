import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import * as AppUtils from '../../utils/app.utils';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'dasboard.component.html'
})

export class DasboardComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private router: Router, private userService: UserService) {
        this.currentUser = JSON.parse(sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
    
    detailUser(id: number) {
        this.router.navigate(['detail', id]);
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}