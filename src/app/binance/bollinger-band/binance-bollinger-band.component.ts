import { Component } from '@angular/core';
import { CandlestickService } from '../api/client/services/candlestick.service';


import { CandlestickInner } from '../api/client/domain/market/candlestick';
import { CandlestickInterval } from '../api/client/domain/market/candlestick-interval';
import { BollingerBand } from '../../objects/bollinger-band';

@Component({
    selector: 'app-binance-bollinger-band',
    templateUrl: './binance-bollinger-band.component.html',
    styleUrls: ['./binance-bollinger-band.component.css']
})
export class BinanceBollingerBandComponent {
    title = 'Binance Bollinger Band';

    constructor(
      private candlestickService: CandlestickService
    ) { }

    getBollingerBands(): BollingerBand[] {
        return null;
    }
}
