import { Injectable } from '@angular/core';
import { Service } from './service';

import { Observable } from 'rxjs/Observable';
import { Candlestick } from '../domain/market/candlestick';
import { CandlestickInterval } from '../domain/market/candlestick-interval';


@Injectable()
export class CandlestickService {
    private candlestickUrl = '/api/v1/klines';

    constructor(
        private service: Service
    ) { }

    getCandlestickBars(symbol: string, interval: string, limit: number, startTime: number, endTime: number)
        : Observable<number[][]> {
            let pattern = '';
            pattern += '?symbol=' + symbol + '&interval=' + interval;
            if(limit != null) {
                pattern += '&limit=' + limit;
            }
            if(startTime != null) {
                pattern += '&startTime=' + startTime;
            }
            if(endTime != null) {
                pattern += '&endTime=' + endTime;
            }
            //console.log(JSON.stringify(pattern));
            return this.service.get(this.candlestickUrl + pattern);
    }
}