import { PipeTransform, Pipe } from '@angular/core';
import { User } from '../registration-login/_models';

import * as AppUtils from '../utils/app.utils';

@Pipe({
    name: 'accountfilter'
})
export class AccountFilterPipe implements PipeTransform {
    transform(values: User[], filterByPackage: string, filterByIs: string) : User[] {
        filterByPackage = filterByPackage && (filterByPackage.toLocaleLowerCase().indexOf('all') ===-1) ? filterByPackage.toLocaleLowerCase() : null;

        let accounts = filterByPackage && values ? values.filter(
            acc => filterByPackage.indexOf(AppUtils.Utilities.getPackageName(acc.role)) !== -1
        ) : values;

        // filter by: isExpired, isFreeTrial or isPaymentPending
        if (filterByIs === 'expired') {
            accounts = accounts ? accounts.filter(
                acc => acc.isExpired
            ) : accounts;
        } else if (filterByIs === 'trial') {
            accounts = accounts ? accounts.filter(
                acc => acc.isFreeTrial
            ) : accounts;
        } else if (filterByIs === 'pending') {
            accounts = accounts ? accounts.filter(
                acc => acc.isPaymentPending
            ) : accounts;
        }

        return accounts;
    }
}