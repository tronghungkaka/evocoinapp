import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../_models';

import * as AppUtils from '../../utils/app.utils';

@Injectable()
export class AuthenticationService {
    private url = AppUtils.BACKEND_API_ROOT_URL;

    @Output() loggedInOutEvent: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        let user: User = new User();
        user.username = username;
        user.password = password;
        return this.http.post<any>(this.url + AppUtils.BACKEND_API_EVO_AUTHENTICATE_PATH, user)
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) { //} && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let currentUser = AppUtils.Utilities.setUser(user);
                    
                    localStorage.setItem(AppUtils.STORAGE_ACCOUNT, JSON.stringify(currentUser));
                    
                    // console.log(JSON.stringify(user))
                    // console.log(JSON.stringify(currentUser))
                    this.loggedInOutEvent.emit('logged in');
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(AppUtils.STORAGE_ACCOUNT);
        this.loggedInOutEvent.emit('logged out');
    }
}