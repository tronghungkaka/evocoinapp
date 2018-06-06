import { Injectable } from '@angular/core';
import { Service } from './service';

import { Observable } from 'rxjs/Observable';
import { ServerTime } from '../binance/objects/general/server-time';

import * as AppUtils from '../utils/app.utils';

@Injectable()
export class ServerTimeService {
    private serverTimeUrl = AppUtils.BACKEND_API_BINANCE_SERVERTIME_PATH;

    constructor(
        private service: Service
    ) { }

    getServerTime(): Observable<ServerTime> {
        return this.service.get(this.serverTimeUrl);
    }
}