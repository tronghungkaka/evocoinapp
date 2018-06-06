import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models';

import * as AppUtils from '../../utils/app.utils';

import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { UpgradeModalComponent } from '../../modal/upgrade/upgrade-modal.component';
import { overlayConfigFactory } from 'angular2-modal';

@Injectable()
export class GoldAuthGuard implements CanActivate {

    constructor(private router: Router, private modal: Modal) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log("canActive - " + localStorage.getItem(AppUtils.STORAGE_ACCOUNT));
        let user: User = JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT));
        let content_mess;
        let head_mess;
        let isShowModal = false;

        if (!user) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        // logged in
        if (user.role >= AppUtils.GOLD_ROLE) {
            // user's role is right so check if user's account is expired.
            if (user.isExpired) {
                if (!user.isFreeTrial) {
                    if (user.isPaymentPending) {
                        head_mess = AppUtils.PAYMENT_PENDING_ACCOUNT_HEAD_MESSENGER;
                        content_mess = AppUtils.PAYMENT_PENDING_ACCOUNT_CONTENT_MESSENGER;
                        isShowModal = true;
                    } else {
                        head_mess = AppUtils.EXPIRED_ACCOUNT_HEAD_MESSENGER;
                        content_mess = AppUtils.EXPIRED_ACCOUNT_CONTENT_MESSENGER;
                        isShowModal = true;
                    }
                }
            }
        } else {
            // user's role is low
            head_mess = AppUtils.UPGRADE_ACCOUNT_HEAD_MESSENGER;
            content_mess = AppUtils.UPGRADE_ACCOUNT_CONTENT_MESSENGER;
            isShowModal = true;
        }
        
        if (isShowModal) {
            this.modal.open(UpgradeModalComponent, overlayConfigFactory({head_mess: head_mess, content_mess: content_mess}, BSModalContext))
        }
        
        return true;
    }
}