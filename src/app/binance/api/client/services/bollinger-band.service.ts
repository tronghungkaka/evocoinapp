import { Injectable } from '@angular/core';
import { Service } from './service';

import { Observable } from 'rxjs/Observable';
import { BollingerBand } from '../../../../objects/bollinger-band';
import { BollingerBandResponse } from '../../../../objects/bollinger-band-response';


@Injectable()
export class BollingerBandService {
    private candlestickUrl = '/api/v1/klines';

    constructor(
        private service: Service
    ) { }

    getBollingerBands(interval: string, exchange: string)
        : Observable<BollingerBand[]> {
            let pattern = '';
            
            //console.log(JSON.stringify(pattern));
            return this.service.get(this.candlestickUrl + pattern);
    }

    getEvoBollingerBandResponse(exchange: string, interval: string): Observable<BollingerBandResponse> {
        let pattern = "/api/evo/bollingerband";
        pattern += "?exchange=" + exchange + "&interval=" + interval;
        return this.service.get(pattern);
    }
}