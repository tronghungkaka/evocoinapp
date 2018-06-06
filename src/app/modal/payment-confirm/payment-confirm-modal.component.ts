import { Component } from '@angular/core';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ModalComponent, DialogRef, CloseGuard} from 'angular2-modal';
import { UserService } from '../../registration-login/_services';
import { PaymentService } from '../../payment-package/_services/payment.service';
import { Payment } from '../../payment-package/_models/payment.component';
import { User } from '../../registration-login/_models';

import * as AppUtils from '../../utils/app.utils';
import { EmailService } from '../../payment-package/_services/email.service';

export class PaymentConfirmModalContext extends BSModalContext {
    constructor(head_mess: string, content_mess: string, public creater: User) {
        super();
    }
}

@Component({
    selector: 'app-payment-confirm-modal',
    templateUrl: './payment-confirm-modal.component.html',
    styleUrls: ['./payment-confirm-modal.component.css']
})
export class PaymentConfirmModalComponent implements CloseGuard, ModalComponent<PaymentConfirmModalContext> {
    context: PaymentConfirmModalContext;

    public result: boolean;
    public shouldUseMyClass: string;

    private unconfirmedPayments: Payment[];
    private confirmer: User;

    private today: number = Date.now();

    constructor(private userService: UserService,
        private paymentService: PaymentService, 
        private emailService: EmailService,
        public dialog: DialogRef<PaymentConfirmModalContext>) {
        
        this.context = dialog.context;
        dialog.setCloseGuard(this);
        dialog.context.dialogClass = 'lg';

        this.paymentService.getAllUnconfirmedPaymentsByCreater(this.context.creater.id).subscribe(
            res => {
                this.unconfirmedPayments = res
                // this.unconfirmedPayments.forEach(element => {
                //     element.receivedMoney = element.sendMoney
                // });
            }
        )
        this.confirmer = JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT));
    }

    beforeClose(): boolean {
        return false;
    }

    beforeDismiss(): boolean {
        return true;
    }

    confirm(payment: Payment) {
        payment.confirmedUserId = this.confirmer.id;
        this.paymentService.confirmPayment(payment).subscribe(
            res => {
                // console.log(JSON.stringify(res))
            }
        );
        this.context.creater.role = AppUtils.Utilities.getRole(payment.paymentPackage);
        this.userService.confirmPayment(this.context.creater).subscribe(
            res => {
                // console.log(JSON.stringify(res));
                this.emailService.sendPaymentEmail(this.context.creater.username).subscribe(
                    res => {
                        // console.log(JSON.stringify(res));
                    }
                )
            }
        )
    }

    close() {
        this.result = false;
        this.dialog.close(this.result);
    }
}