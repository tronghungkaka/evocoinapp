import { Injectable } from '@angular/core';
import { Service } from './service';

import { Observable } from 'rxjs/Observable';
import { CandlestickInner } from '../domain/market/candlestick';
import { CandlestickInterval } from '../domain/market/candlestick-interval';


@Injectable()
export class CandlestickService {
    private candlestickUrl = '/api/v1/klines';

    constructor(
        private service: Service
    ) { }

    getCandlestickBars(symbol: string, interval: CandlestickInterval, limit: number, startTime: number, endTime: number)
        : Observable<CandlestickInner[]> {
            let pattern = '';
            pattern += '?symbol=' + symbol + '&interval=' + interval;
            if(startTime != null) {
                pattern += '&startTime=' + startTime;
            }
            if(endTime != null) {
                pattern += '&endTime=' + endTime;
            }
            return this.service.get(this.candlestickUrl + pattern);
    }
}