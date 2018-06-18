import { Component } from '@angular/core';

import * as AppUtils from '../../utils/app.utils';
import { User } from '../../registration-login/_models';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.css']
})
export class PackageComponent {

    currentUser: User;

    package_list: any = [
        {
            header: AppUtils.BOLLINGER_BAND_PACKAGE_LIST_HEADER,
            content: AppUtils.BOLLINGER_BAND_PACKAGE_LIST_CONTENT
        },
        {
            header: AppUtils.REAL_CASH_FLOW_PACKAGE_LIST_HEADER,
            content: AppUtils.REAL_CASH_FLOW_PACKAGE_LIST_CONTENT
        },
        {
            header: AppUtils.TELEGRAM_PACKAGE_LIST_HEADER,
            content: AppUtils.TELEGRAM_PACKAGE_LIST_CONTENT
        },
        {
            header: AppUtils.CLASS_PACKAGE_LIST_HEADER,
            content: AppUtils.CLASS_PACKAGE_LIST_CONTENT
        },
        {
            header: AppUtils.OFFICE_PACKAGE_LIST_HEADER,
            content: AppUtils.OFFICE_PACKAGE_LIST_CONTENT
        }
    ];

    constructor() {
        this.currentUser = JSON.parse(sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT));
    }
}