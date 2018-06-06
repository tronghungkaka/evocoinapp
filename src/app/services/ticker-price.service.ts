import { Injectable } from '@angular/core';
import { Service } from './service';

import { Observable } from 'rxjs/Observable';
import { TickerPriceInner } from '../binance/objects/market/ticker-price';

import * as AppUtils from '../utils/app.utils';


@Injectable()
export class TickerPriceService {
    private tickerPriceUrl = AppUtils.BACKEND_API_BINANCE_TICKERPRICE_PATH;

    constructor(
        private service: Service
    ) { }

    getAllPrices(): Observable<TickerPriceInner[]> {
        return this.service.get(this.tickerPriceUrl);
    }

    getPrice(symbol: string): Observable<TickerPriceInner> {
        // let pattern = '?symbol=' + symbol;
        let pattern = '/' + symbol;
        return this.service.get(this.tickerPriceUrl + pattern);
    }
}