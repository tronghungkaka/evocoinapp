import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../registration-login/_models";

import * as AppUtils from '../../utils/app.utils';

import { UserService } from "../../registration-login/_services";
import { PaymentService } from "../_services/payment.service";
import { Payment } from "../_models/payment.component";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
    packagename: string;
    packagefullname: string;
    packagemoney: string;
    packagebitcoin: string;
    color: string;
    transactionId: string;

    currentUser: User;

    constructor(
        private router: Router,
        private route: ActivatedRoute, 
        private userService: UserService, 
        private paymentService: PaymentService) {
        this.packagename = route.snapshot.params['name'];
        if(this.packagename === AppUtils.FREE_PACKAGE) {
            this.packagefullname = AppUtils.FREE_PACKAGE_DETAIL;
            this.packagemoney = AppUtils.FREE_PACKAGE_MONEY;
            this.packagebitcoin = AppUtils.FREE_PACKAGE_BITCOIN;
            this.color = AppUtils.FREE_PACKAGE_COLOR;
        } else if(this.packagename === AppUtils.GOLD_PACKAGE) {
            this.packagefullname = AppUtils.GOLD_PACKAGE_DETAIL;
            this.packagemoney = AppUtils.GOLD_PACKAGE_MONEY;
            this.packagebitcoin = AppUtils.GOLD_PACKAGE_BITCOIN;
            this.color = AppUtils.GOLD_PACKAGE_COLOR;
        } else if(this.packagename === AppUtils.DIAMOND_PACKAGE) {
            this.packagefullname = AppUtils.DIAMOND_PACKAGE_DETAIL;
            this.packagemoney = AppUtils.DIAMOND_PACKAGE_MONEY;
            this.packagebitcoin = AppUtils.DIAMOND_PACKAGE_BITCOIN;
            this.color = AppUtils.DIAMOND_PACKAGE_COLOR;
        } else if(this.packagename === AppUtils.SUPERVIP_PACKAGE) {
            this.packagefullname = AppUtils.SUPERVIP_PACKAGE_DETAIL;
            this.packagemoney = AppUtils.SUPERVIP_PACKAGE_MONEY;
            this.packagebitcoin = AppUtils.SUPERVIP_PACKAGE_BITCOIN;
            this.color = AppUtils.SUPERVIP_PACKAGE_COLOR;
        }

        this.currentUser = JSON.parse(sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT));
    }

    createPayment() {
        this.currentUser.isPaymentPending = true;
        // console.log(JSON.stringify(this.currentUser));
        this.userService.createPayment(this.currentUser).subscribe(
            res => {
                if (res) {
                    sessionStorage.setItem(AppUtils.STORAGE_ACCOUNT, JSON.stringify(this.currentUser))
                }
            }
        );

        let payment: Payment = new Payment();
        payment.createdUserId = this.currentUser.id;
        payment.paymentPackage = this.packagename;
        // payment.sendMoney = this.packagemoney;
        payment.transactionId = this.transactionId;
        this.paymentService.createPayment(payment).subscribe(
            res => {
                // console.log(JSON.stringify(res))
            }
        );

        this.router.navigate(['payment-success']);
    }

}