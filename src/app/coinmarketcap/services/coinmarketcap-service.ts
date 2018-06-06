import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Service } from '../../services/service';
import { CoinmarketcapTicker } from '../object/coinmarketcap-ticker.component';
import { CoinmarketcapGlobalData } from '../object/coinmarketcap-global-data.component';

@Injectable()
export class CoinmarketcapService {

    constructor(
        private service: Service
    ) { }

    getTickers(start: number, limit: number, convert: string): Observable<CoinmarketcapTicker[]> {
        let pattern = "/api/coinmarketcap/v1/ticker";
        let tmp = "?";
        if(start != null) {
            pattern += tmp + "start=" + start;
            tmp = "&";
        }
        if(limit != null) {
            pattern += tmp + "limit=" + limit;
            tmp = "&";
        }
        if(convert != null) {
            pattern += tmp + "convert=" + convert;
            tmp = "&";
        }
        return this.service.get(pattern);
    }

    getTicker(symbol: string, convert: string): Observable<CoinmarketcapTicker> {
        let pattern = "/api/coinmarketcap/v1/ticker";
        pattern += "/" + symbol;
        if(convert != null) {
            pattern += "?convert=" + convert;
        }
        return this.service.get(pattern);
    }

    getGlobalData(convert: string): Observable<CoinmarketcapGlobalData> {
        let pattern = "/api/coinmarketcap/v1/global";
        if(convert != null) {
            pattern += "?convert=" + convert;
        }
        return this.service.get(pattern);
    }
}