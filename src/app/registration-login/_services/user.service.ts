import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {

    private url = 
                    // 'http://localhost:8080'; 
                    'https://evocoinappserver.herokuapp.com';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.url + '/api/evo/users');
    }

    getById(id: number) {
        return this.http.get(this.url + '/api/evo/users/' + id);
    }

    create(user: User) {
        console.log(JSON.stringify(user));
        return this.http.post(this.url + '/api/evo/users', user);
    }

    update(user: User) {
        return this.http.put(this.url + '/api/evo/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.url + '/api/evo/users/' + id);
    }
}