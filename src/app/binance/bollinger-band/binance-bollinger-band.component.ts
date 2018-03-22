import { Component, OnInit } from '@angular/core';
import { CandlestickService } from '../api/client/services/candlestick.service';
import { TickerPriceService } from '../api/client/services/ticker-price.service';
import { ServerTimeService } from '../api/client/services/server-time.service';
import { Service } from '../api/client/services/service';

import { TickerPrice } from '../api/client/domain/market/ticker-price';
import { Candlestick } from '../api/client/domain/market/candlestick';
import { CandlestickInterval } from '../api/client/domain/market/candlestick-interval';
import { BollingerBand } from '../../objects/bollinger-band';
import { BollingerBandResponse } from '../../objects/bollinger-band-response';

// import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-binance-bollinger-band',
    templateUrl: './binance-bollinger-band.component.html',
    styleUrls: ['./binance-bollinger-band.component.css']
})
export class BinanceBollingerBandComponent implements OnInit{
    title = 'Binance Bollinger Band';

    timeFrame: TimeFrame = TimeFrame.FIVE_MINUTES; // default value

    exchange: Exchange = Exchange.BINANCE;

    bollingerBands: BollingerBand[];

    bollingerbandResponse: BollingerBandResponse;
    
    constructor(
      private candlestickService: CandlestickService,
      private tickerPriceService: TickerPriceService,
      private serverTimeService: ServerTimeService,
      private service: Service
    ) { }

    ngOnInit() {
        this.bollingerbandResponse = new BollingerBandResponse();
        this.func();
        // CandlestickInner[] candlesticks = this.candlestickService.getCandlestickBars()
    }

    func() {
        // //console.log(this.timeFrame);
        // this.bollingerBands = new Array();
        // this.tickerPriceService.getAllPrices().subscribe(
        //     tickerPrices => this.showBollingerBands(tickerPrices)//.filter(item => item.symbol.includes("BTC")))
        // );

        let uri = "/api/bollingerband/binance/" + CandlestickInterval.getInterval(this.timeFrame);
        this.service.get<BollingerBandResponse>(uri).subscribe(
            data => this.bollingerbandResponse = data
        );
    }

    showBollingerBands(tickerPrices: TickerPrice[]): void {
        //console.log(JSON.stringify(tickerPrices));
        //console.log(JSON.stringify(tickerPrices.length));
        //let bollingerBands: BollingerBand[] = new Array();
        for(let tp of tickerPrices) {
            //console.log("timeFrame to string " + CandlestickInterval.getInterval(this.timeFrame));
            this.candlestickService.getCandlestickBars(tp.symbol, CandlestickInterval.getInterval(this.timeFrame), 20, null, null)
                .subscribe(
                    candlestickBars => {
                        //console.log(JSON.stringify(candlestickBars[0]));
                        let bb = this.calcBollingerBand(tp, candlestickBars);
                        //console.log(JSON.stringify(bb));
                        if(bb != null)
                            this.bollingerBands.push(bb);
                    }
                );
        }
        //this.bollingerBands = bollingerBands.sort(this.compareFn);
        //console.log(JSON.stringify(this.bollingerBands));
    }

    private compareFn(a: BollingerBand, b: BollingerBand): number {
        let aPercentage = a.getPercentage();
        let bPercentage = b.getPercentage();
        if(aPercentage > bPercentage)
            return 1;
        if(aPercentage < bPercentage)
            return -1;
        return 0;
    }

    calcBollingerBand(tickerPrice: TickerPrice, candlestickBars: number[][]): BollingerBand {
        // let closePrices: number[] = new Array();
        // for(let cdstBar of candlestickBars) {
        //     closePrices.push(cdstBar[4] * 100000000);
        // }
        // //console.log(closePrices);
        // let bb = new BollingerBand();
        // bb.setExchange('binance');
        // bb.setSymbol(tickerPrice.symbol);
        // bb.setLastPrice(tickerPrice.price * 100000000);
        // bb.setSimpleMovingAverage(this.calcSimpleMovingAverage(closePrices));
        // //console.log('sma = ' + bb.simpleMovingAverage);
        // let stdDeviation = this.calcStandardDeviation(closePrices);
        // bb.setUpperBollingerBand(bb.getSimpleMovingAverage() + (stdDeviation * BollingerBand.FACTOR));
        // bb.setLowerBollingerBand(bb.getSimpleMovingAverage() - (stdDeviation * BollingerBand.FACTOR));
        // //console.log('last price=' + bb.lastPrice + ' ' + bb.upperBollingerBand + ' ' + bb.lowerBollingerBand);
        // if(bb.isOutOfLowerBollingerBand() || bb.isOutOfUpperBollingerBand())
        //     return bb;
        return null;
    }

    calcSimpleMovingAverage(a: number[]): number {
        let sum = 0.;
        for(let i of a) {
            sum += i;
        }
        return sum / a.length;
    }

    calcStandardDeviation(a: number[]): number {
        let sma = this.calcSimpleMovingAverage(a);
        let tmp = 0.;
        for(let i of a) {
            tmp += (i-sma) * (i-sma);
        }
        tmp /= a.length;
        return Math.sqrt(tmp);
    }
}

enum TimeFrame {
    FIVE_MINUTES = 300,   // 5m
    HAFL_HOURLY = 1800,    // 30m
    HOURLY = 3600, // 1h
    FOUR_HOURS = 14400, // 4h
    DAILY = 86400,  // 1d
    WEEKLY = 604800 // 1w
}

enum Exchange {
    ALL,
    BINANCE
}