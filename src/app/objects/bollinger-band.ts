export class BollingerBand {
    exchange: string;
    symbol: string;
    currencySymbol: string;
    baseCurrencySymbol: string;
    lastPrice: number;
    upperBollingerBand: number;
    simpleMovingAverage: number;
    lowerBollingerBand: number;
    percentage: number = null;

    static NUMBER_OF_CANDLESTICK_BARS = 20;
    static FACTOR = 2;

    constructor() {

    }

    isOutOfUpperBollingerBand(): boolean {
        if(this.lastPrice > this.upperBollingerBand)
            return true;
        return false;
    }

    isOutOfLowerBollingerBand(): boolean {
        if(this.lastPrice < this.lowerBollingerBand)
            return true;
        return false;
    }

    getPercentage(): number {
        if(this.percentage != null)
            return this.percentage;
        if(this.isOutOfLowerBollingerBand()) {
            this.percentage = (this.lowerBollingerBand - this.lastPrice) / this.lowerBollingerBand;
        }
        else if(this.isOutOfUpperBollingerBand()) {
            this.percentage = (this.lastPrice - this.upperBollingerBand) / this.upperBollingerBand;
        }
        return this.percentage;
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
    }

    getUpperBollingerBand(): number {
        return this.upperBollingerBand;
    }

    setUpperBollingerBand(upperBollingerBand: number): void {
        this.upperBollingerBand = upperBollingerBand;
    }

    getSimpleMovingAverage(): number {
        return this.simpleMovingAverage;
    }

    setSimpleMovingAverage(simpleMovingAverage: number): void {
        this.simpleMovingAverage = simpleMovingAverage;
    }

    getLowerBollingerBand(): number {
        return this.lowerBollingerBand;
    }

    setLowerBollingerBand(lowerBollingerBand: number): void {
        this.lowerBollingerBand = lowerBollingerBand;
    }
}