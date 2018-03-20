import { Injectable } from '@angular/core';
import { Service } from './service';

import { Observable } from 'rxjs/Observable';
import { ServerTime } from '../domain/general/server-time';


@Injectable()
export class ServerTimeService {
    private serverTimeUrl = '/api/v1/time';

    constructor(
        private service: Service
    ) { }

    getServerTime(): Observable<ServerTime> {
        return this.service.get(this.serverTimeUrl);
    }
}