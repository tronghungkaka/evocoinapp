import { Component, OnInit, NgModule } from '@angular/core';
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

    timeFrame: TimeFrame = TimeFrame.HAFL_HOURLY; // default value

    exchange: Exchange = Exchange.BINANCE;

    progress: number = 0;

    outOfUpperBB_BTCs: BollingerBand[];
    outOfUpperBB_ETHs: BollingerBand[];
    outOfUpperBB_BNBs: BollingerBand[];
    outOfUpperBB_USDTs: BollingerBand[];

    outOfLowerBB_BTCs: BollingerBand[];
    outOfLowerBB_ETHs: BollingerBand[];
    outOfLowerBB_BNBs: BollingerBand[];
    outOfLowerBB_USDTs: BollingerBand[];

    isAscSorted_outOfUpperBB_BTCs: Boolean = null;
    isAscSorted_outOfUpperBB_ETHs: Boolean = null;
    isAscSorted_outOfUpperBB_BNBs: Boolean = null;
    isAscSorted_outOfUpperBB_USDTs: Boolean = null;

    isAscSorted_outOfLowerBB_BTCs: Boolean = null;
    isAscSorted_outOfLowerBB_ETHs: Boolean = null;
    isAscSorted_outOfLowerBB_BNBs: Boolean = null;
    isAscSorted_outOfLowerBB_USDTs: Boolean = null;

    // bollingerbandResponse: BollingerBandResponse;
    
    constructor(
      private candlestickService: CandlestickService,
      private tickerPriceService: TickerPriceService,
      private serverTimeService: ServerTimeService,
      private service: Service
    ) { }

    ngOnInit() {
        this.func();
        // CandlestickInner[] candlesticks = this.candlestickService.getCandlestickBars()
    }

    initBBs() {
        this.outOfUpperBB_BTCs = new Array();
        this.outOfUpperBB_ETHs = new Array();
        this.outOfUpperBB_BNBs = new Array();
        this.outOfUpperBB_USDTs = new Array();
    
        this.outOfLowerBB_BTCs = new Array();
        this.outOfLowerBB_ETHs = new Array();
        this.outOfLowerBB_BNBs = new Array();
        this.outOfLowerBB_USDTs = new Array();

        this.isAscSorted_outOfUpperBB_BTCs = null;
        this.isAscSorted_outOfUpperBB_ETHs = null;
        this.isAscSorted_outOfUpperBB_BNBs = null;
        this.isAscSorted_outOfUpperBB_USDTs = null;

        this.isAscSorted_outOfLowerBB_BTCs = null;
        this.isAscSorted_outOfLowerBB_ETHs = null;
        this.isAscSorted_outOfLowerBB_BNBs = null;
        this.isAscSorted_outOfLowerBB_USDTs = null;      
    }

    func() {
        console.log(this.timeFrame);
        // this.bollingerbandResponse = new BollingerBandResponse();
        this.initBBs();
        this.tickerPriceService.getAllPrices().subscribe(
            tickerPrices => //console.log(JSON.stringify(tickerPrices))
                this.showBollingerBands(tickerPrices)//.filter(item => item.symbol.includes("BTC")))
        );

        // let uri = "/api/bollingerband/binance/" + CandlestickInterval.getInterval(this.timeFrame);
        // this.service.get<BollingerBandResponse>(uri).subscribe(
        //     data => this.bollingerbandResponse = data
        // );
    }

    showBollingerBands(tickerPrices: TickerPrice[]): void {
        //console.log(JSON.stringify(tickerPrices));
        //console.log(JSON.stringify(tickerPrices.length));
        //let bollingerBands: BollingerBand[] = new Array();
        let count = 0;
        for(let tp of tickerPrices) {
            //console.log("timeFrame to string " + CandlestickInterval.getInterval(this.timeFrame));
            this.candlestickService.getCandlestickBars(tp.symbol, CandlestickInterval.getInterval(this.timeFrame), 20, null, null)
                .subscribe(
                    candlestickBars => {
                        //console.log(JSON.stringify(candlestickBars[0]));
                        let bb = this.calcBollingerBand(tp, candlestickBars);
                        if(bb != null) {
                            // console.log(JSON.stringify(bb.getPercentage()));
                            if(bb.isOutOfLowerBollingerBand()) {
                                if(bb.baseCurrencySymbol == "BTC")
                                    this.outOfLowerBB_BTCs.push(bb);
                                else if(bb.baseCurrencySymbol == "ETH")
                                    this.outOfLowerBB_ETHs.push(bb);
                                else if(bb.baseCurrencySymbol == "BNB")
                                    this.outOfLowerBB_BNBs.push(bb);
                                else
                                    this.outOfLowerBB_USDTs.push(bb);
                            }
                            else if(bb.isOutOfUpperBollingerBand()) {
                                if(bb.baseCurrencySymbol == "BTC")
                                    this.outOfUpperBB_BTCs.push(bb);
                                else if(bb.baseCurrencySymbol == "ETH")
                                    this.outOfUpperBB_ETHs.push(bb);
                                else if(bb.baseCurrencySymbol == "BNB")
                                    this.outOfUpperBB_BNBs.push(bb);
                                else
                                    this.outOfUpperBB_USDTs.push(bb);
                            }
                        }
                        ++count;
                        this.progress = ( count / tickerPrices.length ) * 100;
                    }
                );
        }
        //this.bollingerBands = bollingerBands.sort(this.compareFn);
        //console.log(JSON.stringify(this.bollingerBands));
    }

    refresh() {
        this.func();
    }

    clickSortButton(bbIdx: number) {
        console.log("bbIdx = " + bbIdx);
        if(bbIdx == 4) {
            if(this.isAscSorted_outOfLowerBB_BTCs == null)
                this.isAscSorted_outOfLowerBB_BTCs = false;
            this.sortBB(this.outOfLowerBB_BTCs, this.isAscSorted_outOfLowerBB_BTCs);
            this.isAscSorted_outOfLowerBB_BTCs = !this.isAscSorted_outOfLowerBB_BTCs;
        }
        else if(bbIdx == 5) {
            if(this.isAscSorted_outOfLowerBB_ETHs == null)
            this.isAscSorted_outOfLowerBB_ETHs = false;
            this.sortBB(this.outOfLowerBB_ETHs, this.isAscSorted_outOfLowerBB_ETHs);
            this.isAscSorted_outOfLowerBB_ETHs = !this.isAscSorted_outOfLowerBB_ETHs;
        }
        else if(bbIdx == 6) {
            if(this.isAscSorted_outOfLowerBB_BNBs == null)
            this.isAscSorted_outOfLowerBB_BNBs = false;
            this.sortBB(this.outOfLowerBB_BNBs, this.isAscSorted_outOfLowerBB_BNBs);
            this.isAscSorted_outOfLowerBB_BNBs = !this.isAscSorted_outOfLowerBB_BNBs;
        }
        else if(bbIdx == 7) {
            if(this.isAscSorted_outOfLowerBB_USDTs == null)
            this.isAscSorted_outOfLowerBB_USDTs = false;
            this.sortBB(this.outOfLowerBB_USDTs, this.isAscSorted_outOfLowerBB_USDTs);
            this.isAscSorted_outOfLowerBB_USDTs = !this.isAscSorted_outOfLowerBB_USDTs;
        }
        else if(bbIdx == 0) {
            if(this.isAscSorted_outOfUpperBB_BTCs == null)
            this.isAscSorted_outOfUpperBB_BTCs = false;
            this.sortBB(this.outOfUpperBB_BTCs, this.isAscSorted_outOfUpperBB_BTCs);
            this.isAscSorted_outOfUpperBB_BTCs = !this.isAscSorted_outOfUpperBB_BTCs;
        }
        else if(bbIdx == 1) {
            if(this.isAscSorted_outOfUpperBB_ETHs == null)
            this.isAscSorted_outOfUpperBB_ETHs = false;
            this.sortBB(this.outOfUpperBB_ETHs, this.isAscSorted_outOfUpperBB_ETHs);
            this.isAscSorted_outOfUpperBB_ETHs = !this.isAscSorted_outOfUpperBB_ETHs;
        }
        else if(bbIdx == 2) {
            if(this.isAscSorted_outOfUpperBB_BNBs == null)
            this.isAscSorted_outOfUpperBB_BNBs = false;
            this.sortBB(this.outOfUpperBB_BNBs, this.isAscSorted_outOfUpperBB_BNBs);
            this.isAscSorted_outOfUpperBB_BNBs = !this.isAscSorted_outOfUpperBB_BNBs;
        }
        else if(bbIdx == 3) {
            if(this.isAscSorted_outOfUpperBB_USDTs == null)
            this.isAscSorted_outOfUpperBB_USDTs = false;
            this.sortBB(this.outOfUpperBB_USDTs, this.isAscSorted_outOfUpperBB_USDTs);
            this.isAscSorted_outOfUpperBB_USDTs = !this.isAscSorted_outOfUpperBB_USDTs;
        }
    }

    sortBB(bbs: BollingerBand[], isAsc: Boolean) {
        if(isAsc) {
            bbs.sort(this.compareAscFn);
            isAsc = false;
        }
        else {
            bbs.sort(this.compareDesFn);
            isAsc = true;
        }
    }

    private compareAscFn(a: BollingerBand, b: BollingerBand): number {
        let aPercentage = a.getPercentage();
        let bPercentage = b.getPercentage();
        if(aPercentage > bPercentage)
            return 1;
        if(aPercentage < bPercentage)
            return -1;
        
        if(a.currencySymbol > b.currencySymbol)
            return 1;
        if(a.currencySymbol < b.currencySymbol)
            return -1;
        return 0;
    }

    private compareDesFn(a: BollingerBand, b: BollingerBand): number {
        let aPercentage = a.getPercentage();
        let bPercentage = b.getPercentage();
        if(aPercentage > bPercentage)
            return -1;
        if(aPercentage < bPercentage)
            return 1;

        if(a.currencySymbol > b.currencySymbol)
            return -1;
        if(a.currencySymbol < b.currencySymbol)
            return 1;
        return 0;
    }

    calcBollingerBand(tickerPrice: TickerPrice, candlestickBars: number[][]): BollingerBand {
        let closePrices: number[] = new Array();
        for(let cdstBar of candlestickBars) {
            closePrices.push(cdstBar[4] * BollingerBand.SHATOSHI);
        }
        //console.log(closePrices);
        let bb = new BollingerBand();
        bb.setExchange('binance');
        bb.setSymbol(tickerPrice.symbol);
        bb.setLastPrice(tickerPrice.price * BollingerBand.SHATOSHI);
        bb.setSimpleMovingAverage(this.calcSimpleMovingAverage(closePrices));
        //console.log('sma = ' + bb.simpleMovingAverage);
        let stdDeviation = this.calcStandardDeviation(closePrices);
        bb.setUpperBollingerBand(bb.getSimpleMovingAverage() + (stdDeviation * BollingerBand.FACTOR));
        bb.setLowerBollingerBand(bb.getSimpleMovingAverage() - (stdDeviation * BollingerBand.FACTOR));
        //console.log('last price=' + bb.lastPrice + ' ' + bb.upperBollingerBand + ' ' + bb.lowerBollingerBand);
        if(bb.isOutOfLowerBollingerBand() || bb.isOutOfUpperBollingerBand())
            return bb;
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