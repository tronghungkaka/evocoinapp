import { Injectable } from '@angular/core';
import { Service } from './service';

import { Observable } from 'rxjs/Observable';
import { TickerPriceInner } from '../domain/market/ticker-price';


@Injectable()
export class TickerPriceService {
    private tickerPriceUrl = '/api/v3/ticker/price';

    constructor(
        private service: Service
    ) { }

    getAllPrices(): Observable<TickerPriceInner[]> {
        return this.service.get(this.tickerPriceUrl);
    }

    getPrice(symbol: string): Observable<TickerPriceInner> {
        let pattern = '?symbol=' + symbol;
        return this.service.get(this.tickerPriceUrl + pattern);
    }
}