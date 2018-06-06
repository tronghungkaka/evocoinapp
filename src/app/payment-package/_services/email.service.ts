import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as AppUtils from '../../utils/app.utils';

@Injectable()
export class EmailService {
    private url = AppUtils.BACKEND_API_ROOT_URL;
    private path = AppUtils.BACKEND_API_EVO_EMAIL_PATH;

    constructor(private http: HttpClient) { }

    sendPaymentEmail(username: string) {
        return this.http.get<string>(this.url + this.path + '/payment' + '/' + username);
    }
}