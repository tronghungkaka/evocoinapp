import { Injectable } from '@angular/core';
import { Service } from './service';

import { Observable } from 'rxjs/Observable';
import { Candlestick } from '../binance/objects/market/candlestick';
import { CandlestickInterval } from '../binance/objects/market/candlestick-interval';

import * as AppUtils from '../utils/app.utils';

@Injectable()
export class CandlestickService {
    private candlestickUrl = AppUtils.BACKEND_API_BINANCE_CANDLESTICK_PATH;

    constructor(
        private service: Service
    ) { }

    getCandlestickBars(symbol: string, interval: string, limit: number, startTime: number, endTime: number)
        : Observable<number[][]> {
            let pattern = '';
            // pattern += '?symbol=' + symbol + '&interval=' + interval;
            // if(limit != null) {
            //     pattern += '&limit=' + limit;
            // }
            // if(startTime != null) {
            //     pattern += '&startTime=' + startTime;
            // }
            // if(endTime != null) {
            //     pattern += '&endTime=' + endTime;
            // }
            pattern += '/' + symbol + '/' + interval;
            if(limit != null) {
                pattern += '/' + limit;
            }
            if(startTime != null) {
                pattern += '/' + startTime;
            }
            if(endTime != null) {
                pattern += '/' + endTime;
            }
            //console.log(JSON.stringify(pattern));
            return this.service.get(this.candlestickUrl + pattern);
    }
}