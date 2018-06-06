import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../registration-login/_models';
import { UserService } from '../../registration-login/_services';

import * as AppUtils from '../../utils/app.utils';
import { Payment } from '../_models/payment.component';
import { PaymentService } from '../_services/payment.service';

@Component({
    selector: 'app-payment-detail',
    templateUrl: './payment-detail.component.html',
    styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent {

    creater: User;
    confirmers: User[];
    payments: Payment[];

    constructor(private route: ActivatedRoute, private userService: UserService, private paymentService: PaymentService) {
        let createrId = route.snapshot.params['createrId'];
        if (createrId) {
            this.userService.getById(createrId).subscribe(
                res => this.creater = res
            );
        } else {
            this.creater = JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT));
        }

        this.paymentService.getAllPaymentsByCreater(this.creater.id).subscribe(
            res => {
                console.log(JSON.stringify(res));
                this.payments = res;
                this.confirmers = new Array();
                for (let payment of this.payments) {
                    let confirmer: User = new User();
                    if (payment.confirmedUserId) {
                        this.userService.getById(payment.confirmedUserId).subscribe(
                            res => {
                                confirmer = res
                                this.confirmers.push(confirmer)
                            }
                        )
                    } else {
                        this.confirmers.push(confirmer)
                    }
                }
            }
        )
    }
}