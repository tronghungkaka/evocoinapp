import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

import * as AppUtils from '../../utils/app.utils';

@Injectable()
export class UserService {

    private url = AppUtils.BACKEND_API_ROOT_URL;
    private path = AppUtils.BACKEND_API_EVO_USERS_PATH;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.url + this.path);
    }

    getAllAccount() {
        return this.http.get<User[]>(this.url + this.path + '/account');
    }

    getById(id: number) {
        return this.http.get<User>(this.url + this.path + '/id' + '/' + id);
    }

    getByUsername(username: string) {
        return this.http.get<User>(this.url + this.path + '/username' + '/' + username);
    }

    getByTransactionId(transactionId: string) {
        return this.http.get<User>(this.url + this.path + '/transactionId' + '/' + transactionId);
    }

    create(user: User) {
        console.log(JSON.stringify(user));
        return this.http.post<boolean>(this.url + this.path, JSON.stringify(user));
    }

    update(user: User) {
        console.log(JSON.stringify(user));
        return this.http.put<boolean>(this.url + this.path + '/' + user.username, user);
    }

    delete(id: number) {
        return this.http.delete<boolean>(this.url + this.path + '/' + id);
    }

    validateUsername(username: string) {
        return this.http.get<boolean>(this.url + this.path + '/validate' + '/username' + '/' + username);
    }

    validateEmail(email: string) {
        return this.http.get<boolean>(this.url + this.path + '/validate' + '/email' + '/' + email);
    }

    validatePhone(phone: string) {
        return this.http.get<boolean>(this.url + this.path + '/validate' + '/phone' + '/' + phone);
    }

    createPayment(creater: User) {
        return this.http.put<boolean>(this.url + this.path + '/create' + '/payment', creater);
    }

    confirmPayment(creater: User) {
        return this.http.put<boolean>(this.url + this.path + '/confirm' + '/payment', creater);
    }

    makeRole(user: User) {
        return this.http.put<boolean>(this.url + this.path + '/change' + '/role', user);
    }

    changePassword(user: User) {
        return this.http.put<boolean>(this.url + this.path + '/change' + '/password', user);
    }
}