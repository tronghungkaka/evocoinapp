import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../_models';

@Injectable()
export class AuthenticationService {
    private url = 
                    // 'http://localhost:8080'; 
                    'https://evocoinappserver.herokuapp.com';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        let user: User = new User();
        user.username = username;
        user.password = password;
        return this.http.post<any>(this.url + '/api/evo/authenticate', user)
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) { //} && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}