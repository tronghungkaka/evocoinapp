import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as AppUtils from '../../utils/app.utils';
import { Payment } from '../_models/payment.component';

@Injectable()
export class PaymentService {
    private url = AppUtils.BACKEND_API_ROOT_URL;
    private path = AppUtils.BACKEND_API_EVO_PAYMENTS_PATH;

    constructor(private http: HttpClient) { }
    
    getAllPaymentsByCreater(createrId: number) {
        return this.http.get<Payment[]>(this.url + this.path + '/creater' + '/' + createrId);
    }

    getAllUnconfirmedPaymentsByCreater(createrId: number) {
        return this.http.get<Payment[]>(this.url + this.path + '/creater' + '/unconfirmed' + '/' + createrId);
    }

    getAllPaymentsByConfirmer(confirmerId: number) {
        return this.http.get<Payment[]>(this.url + this.path + '/confirmer' + '/' + confirmerId);
    }

    createPayment(payment: Payment) {
        console.log(JSON.stringify(payment));
        return this.http.post<boolean>(this.url + this.path + '/create', JSON.stringify(payment));
    }

    confirmPayment(payment: Payment) {
        return this.http.post<boolean>(this.url + this.path + '/confirm', payment);
    }
}