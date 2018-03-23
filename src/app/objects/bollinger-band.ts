export class BollingerBand {
    exchange: string;
    symbol: string;
    currencySymbol: string;
    baseCurrencySymbol: string;
    lastPrice: number;
    upperBB: number;
    sma: number;
    lowerBB: number;
    percentage: number = null;
    outOfBands: boolean;
    outOfLowerBollingerBand: boolean;
    outOfUpperBollingerBand: boolean;

    static NUMBER_OF_CANDLESTICK_BARS = 20;
    static FACTOR = 2;
    static SHATOSHI = 100000000;

    stsLastPrice: number;
    stsUpperBB: number;
    stsSMA: number;
    stsLowerBB: number;

    constructor() {

    }

    isOutOfUpperBollingerBand(): boolean {
        if(this.lastPrice > this.upperBB)
            return true;
        return false;
        // return this.outOfUpperBollingerBand;
    }

    isOutOfLowerBollingerBand(): boolean {
        if(this.lastPrice < this.lowerBB)
            return true;
        return false;
        // return this.outOfLowerBollingerBand;
    }

    getPercentage(): number {
        if(this.percentage != null)
            return this.percentage;
        if(this.isOutOfLowerBollingerBand()) {
            this.percentage = (this.stsLowerBB - this.stsLastPrice) / this.stsLowerBB;
        }
        else if(this.isOutOfUpperBollingerBand()) {
            this.percentage = (this.stsLastPrice - this.stsUpperBB) / this.stsUpperBB;
        }
        this.percentage *= 100;
        return this.percentage;
        // return this.percentage;
    }

    getExchange(): string {
        return this.exchange;
    }

    setExchange(exchange: string): void {
        this.exchange = exchange;
    }

    getSymbol(): string {
        return this.symbol;
    }

    setSymbol(symbol: string): void {
        this.symbol = symbol;
        if(symbol.includes('BTC')) {
            this.currencySymbol = symbol.substring(0, symbol.length - 3);
            this.baseCurrencySymbol = 'BTC';
        }
        else if(symbol.includes('ETH')) {
            this.currencySymbol = symbol.substring(0, symbol.length - 3);
            this.baseCurrencySymbol = 'ETH';
        }
        else if(symbol.includes('BNB')) {
            this.currencySymbol = symbol.substring(0, symbol.length - 3);
            this.baseCurrencySymbol = 'BNB';
        }
        else if(symbol.includes('USDT')) {
            this.currencySymbol = symbol.substring(0, symbol.length - 4);
            this.baseCurrencySymbol = 'USDT';
        }
    }

    getLastPrice(): number {
        return this.lastPrice;
    }

    setLastPrice(lastPrice: number): void {
        this.lastPrice = lastPrice;
        this.stsLastPrice = lastPrice * BollingerBand.SHATOSHI;
        this.percentage = null;
    }

    getupperBB(): number {
        return this.upperBB;
    }

    setUpperBollingerBand(upperBB: number): void {
        this.upperBB = upperBB;
        this.stsUpperBB = upperBB * BollingerBand.SHATOSHI;
        this.percentage = null;
    }

    getSimpleMovingAverage(): number {
        return this.sma;
    }

    setSimpleMovingAverage(sma: number): void {
        this.sma = sma;
        this.stsSMA = sma * BollingerBand.SHATOSHI;
        this.percentage = null;
    }

    getlowerBB(): number {
        return this.lowerBB;
    }

    setLowerBollingerBand(lowerBB: number): void {
        this.lowerBB = lowerBB;
        this.stsLowerBB = lowerBB * BollingerBand.SHATOSHI;
        this.percentage = null;
    }
}