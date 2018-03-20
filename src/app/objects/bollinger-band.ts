export class BollingerBand {
    exchange: string;
    symbol: string;
    lastPrice: number;
    upperBollingerBand: number;
    simpleMovingAverage: number;
    lowerBollingerBand: number;

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
        let percentage;
        if(this.isOutOfLowerBollingerBand()) {
            percentage = (this.lowerBollingerBand - this.lastPrice) / this.lowerBollingerBand;
        }
        else if(this.isOutOfUpperBollingerBand()) {
            percentage = (this.lastPrice - this.upperBollingerBand) / this.upperBollingerBand;
        }
        return percentage;
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