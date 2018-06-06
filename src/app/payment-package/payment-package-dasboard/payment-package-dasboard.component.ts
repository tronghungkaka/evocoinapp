import { Component, OnInit } from '@angular/core';
import { UserService } from '../../registration-login/_services';
import { User } from '../../registration-login/_models';

import * as AppUtils from '../../utils/app.utils';

import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';
import { PaymentConfirmModalComponent } from '../../modal/payment-confirm/payment-confirm-modal.component';

@Component({
    selector: 'app-payment-package-dasboard',
    templateUrl: './payment-package-dasboard.component.html',
    styleUrls: ['./payment-package-dasboard.component.css']
})
export class PaymentPackageDasboardComponent implements OnInit {

    accounts: User[];
    account_filter: string;
    package_filter: string;
    searchBy: string;
    search_username: string;
    search_transaction_id: string;

    STORAGE_PPD_ACCOUNT_FILTER: string = 'ppd-account-filter';
    STORAGE_PPD_PACKAGE_FILTER: string = 'ppd-package-filter';
    STORAGE_PPD_SEARCH_BY: string = 'ppd-transaction-id';
    

    constructor(private userService: UserService, private modal: Modal) {
        this.getAllAccount();
    }

    getAllAccount() {
        this.userService.getAllAccount().subscribe(
            res => {
                this.accounts = res
                console.log(JSON.stringify(this.accounts))
            }
        )
    }

    ngOnInit() {
        this.account_filter = localStorage.getItem(this.STORAGE_PPD_ACCOUNT_FILTER) || 'all';
        this.package_filter = localStorage.getItem(this.STORAGE_PPD_PACKAGE_FILTER) || 'all';
        this.searchBy = localStorage.getItem(this.STORAGE_PPD_SEARCH_BY) || 'transaction-id';

        localStorage.setItem(this.STORAGE_PPD_ACCOUNT_FILTER, this.account_filter);
        localStorage.setItem(this.STORAGE_PPD_PACKAGE_FILTER, this.package_filter);
        localStorage.setItem(this.STORAGE_PPD_SEARCH_BY, this.searchBy);
        
    }

    filter_account() {
        localStorage.setItem(this.STORAGE_PPD_ACCOUNT_FILTER, this.account_filter);
        
    }

    filter_package() {
        localStorage.setItem(this.STORAGE_PPD_PACKAGE_FILTER, this.package_filter);

    }
    
    search_by() {
        localStorage.setItem(this.STORAGE_PPD_SEARCH_BY, this.searchBy);
    }

    isSearchByUsername() {
        return this.searchBy.includes('username');
    }

    isSearchByTransactionId() {
        return this.searchBy.includes('transaction-id');
    }

    search_account() {
        this.accounts = new Array();
        if (this.searchBy.includes('username')) {
            this.userService.getByUsername(this.search_username).subscribe(
                res => this.accounts.push(res)
            )
        } else if (this.searchBy.includes('transaction-id')) {
            this.userService.getByTransactionId(this.search_transaction_id).subscribe(
                res => this.accounts.push(res)
            )
        }
    }

    confirm_payment(account: User) {
        let mod = this.modal.open(PaymentConfirmModalComponent, overlayConfigFactory({head_mess: '', content_mess: '', creater: account}, BSModalContext));
        mod.then(
            resultPromise => {
                resultPromise.result.then(
                    result => {
                        // if (result) {
                        //     let idx = this.accounts.indexOf(account);
                        //     this.accounts[idx].isPaymentPending = false;
                        // }
                        this.getAllAccount();
                    }
                )
            }
        )
    }

    getPackageName(role: number) {
        return AppUtils.Utilities.getPackageName(role);
    }
}