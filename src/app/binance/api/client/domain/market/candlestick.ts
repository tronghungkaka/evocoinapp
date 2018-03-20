export class Candlestick {
    openTime: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    closeTime: number;
    quoteAssetVolume: number;
    numberOfTrades: number;
    takerBuyBaseAssetVolume: number;
    takerBuyQuoteAssetVolume: number;

    constructor(candlestickInner: CandlestickInner) {
        this.openTime = candlestickInner.openTime;
        this.open = candlestickInner.open;
        this.high = candlestickInner.high;
        this.low = candlestickInner.low;
        this.close = candlestickInner.close;
        this.volume = candlestickInner.volume;
        this.closeTime = candlestickInner.closeTime;
        this.quoteAssetVolume = candlestickInner.quoteAssetVolume;
        this.numberOfTrades = candlestickInner.numberOfTrades;
        this.takerBuyBaseAssetVolume = candlestickInner.takerBuyBaseAssetVolume;
        this.takerBuyQuoteAssetVolume = candlestickInner.takerBuyQuoteAssetVolume;
    }

    public getOpenTime(): number {
        return this.openTime;
    }

    public setOpenTime(openTime: number): void {
        this.openTime = openTime;
    }

    public getOpen(): number {
        return this.open;
    }

    public setOpen(open: number): void {
        this.open = open;
    }

    public getHigh(): number {
        return this.high;
    }

    public setHigh(high: number): void {
        this.high = high;
    }

    public getLow(): number {
        return this.low;
    }

    public setLow(low: number): void {
        this.low = low;
    }

    public getClose(): number {
        return this.close;
    }

    public setClose(close: number): void {
        this.close = close;
    }

    public getVolume(): number {
        return this.volume;
    }

    public setVolume(volume: number): void {
        this.volume = volume;
    }

    public getCloseTime(): number {
        return this.closeTime;
    }

    public setCloseTime(closeTime: number): void {
        this.closeTime = closeTime;
    }

    public getQuoteAssetVolume(): number {
        return this.quoteAssetVolume;
    }

    public setQuoteAssetVolume(quoteAssetVolume: number): void {
        this.quoteAssetVolume = quoteAssetVolume;
    }

    public getNumberOfTrades(): number {
        return this.numberOfTrades;
    }

    public setNumberOfTrades(numberOfTrades: number): void {
        this.numberOfTrades = numberOfTrades;
    }

    public getTakerBuyBaseAssetVolume(): number {
        return this.takerBuyBaseAssetVolume;
    }

    public setTakerBuyBaseAssetVolume(takerBuyBaseAssetVolume: number): void {
        this.takerBuyBaseAssetVolume = takerBuyBaseAssetVolume;
    }

    public getTakerBuyQuoteAssetVolume(): number {
        return this.takerBuyQuoteAssetVolume;
    }

    public setTakerBuyQuoteAssetVolume(takerBuyQuoteAssetVolume: number): void {
        this.takerBuyQuoteAssetVolume = takerBuyQuoteAssetVolume;
    }
}

export class CandlestickInner {
    openTime: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    closeTime: number;
    quoteAssetVolume: number;
    numberOfTrades: number;
    takerBuyBaseAssetVolume: number;
    takerBuyQuoteAssetVolume: number;

    constructor() {

    }

    public getOpenTime(): number {
        return this.openTime;
    }

    public setOpenTime(openTime: number): void {
        this.openTime = openTime;
    }

    public getOpen(): number {
        return this.open;
    }

    public setOpen(open: number): void {
        this.open = open;
    }

    public getHigh(): number {
        return this.high;
    }

    public setHigh(high: number): void {
        this.high = high;
    }

    public getLow(): number {
        return this.low;
    }

    public setLow(low: number): void {
        this.low = low;
    }

    public getClose(): number {
        return this.close;
    }

    public setClose(close: number): void {
        this.close = close;
    }

    public getVolume(): number {
        return this.volume;
    }

    public setVolume(volume: number): void {
        this.volume = volume;
    }

    public getCloseTime(): number {
        return this.closeTime;
    }

    public setCloseTime(closeTime: number): void {
        this.closeTime = closeTime;
    }

    public getQuoteAssetVolume(): number {
        return this.quoteAssetVolume;
    }

    public setQuoteAssetVolume(quoteAssetVolume: number): void {
        this.quoteAssetVolume = quoteAssetVolume;
    }

    public getNumberOfTrades(): number {
        return this.numberOfTrades;
    }

    public setNumberOfTrades(numberOfTrades: number): void {
        this.numberOfTrades = numberOfTrades;
    }

    public getTakerBuyBaseAssetVolume(): number {
        return this.takerBuyBaseAssetVolume;
    }

    public setTakerBuyBaseAssetVolume(takerBuyBaseAssetVolume: number): void {
        this.takerBuyBaseAssetVolume = takerBuyBaseAssetVolume;
    }

    public getTakerBuyQuoteAssetVolume(): number {
        return this.takerBuyQuoteAssetVolume;
    }

    public setTakerBuyQuoteAssetVolume(takerBuyQuoteAssetVolume: number): void {
        this.takerBuyQuoteAssetVolume = takerBuyQuoteAssetVolume;
    }
}

export class CandlestickOuter {
    openTime: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    closeTime: number;
    quoteAssetVolume: number;
    numberOfTrades: number;
    takerBuyBaseAssetVolume: number;
    takerBuyQuoteAssetVolume: number;

    constructor(candlestick: Candlestick) {
        this.openTime = candlestick.openTime;
        this.open = candlestick.open;
        this.high = candlestick.high;
        this.low = candlestick.low;
        this.close = candlestick.close;
        this.volume = candlestick.volume;
        this.closeTime = candlestick.closeTime;
        this.quoteAssetVolume = candlestick.quoteAssetVolume;
        this.numberOfTrades = candlestick.numberOfTrades;
        this.takerBuyBaseAssetVolume = candlestick.takerBuyBaseAssetVolume;
        this.takerBuyQuoteAssetVolume = candlestick.takerBuyQuoteAssetVolume;
    }

    public getOpenTime(): number {
        return this.openTime;
    }

    public setOpenTime(openTime: number): void {
        this.openTime = openTime;
    }

    public getOpen(): number {
        return this.open;
    }

    public setOpen(open: number): void {
        this.open = open;
    }

    public getHigh(): number {
        return this.high;
    }

    public setHigh(high: number): void {
        this.high = high;
    }

    public getLow(): number {
        return this.low;
    }

    public setLow(low: number): void {
        this.low = low;
    }

    public getClose(): number {
        return this.close;
    }

    public setClose(close: number): void {
        this.close = close;
    }

    public getVolume(): number {
        return this.volume;
    }

    public setVolume(volume: number): void {
        this.volume = volume;
    }

    public getCloseTime(): number {
        return this.closeTime;
    }

    public setCloseTime(closeTime: number): void {
        this.closeTime = closeTime;
    }

    public getQuoteAssetVolume(): number {
        return this.quoteAssetVolume;
    }

    public setQuoteAssetVolume(quoteAssetVolume: number): void {
        this.quoteAssetVolume = quoteAssetVolume;
    }

    public getNumberOfTrades(): number {
        return this.numberOfTrades;
    }

    public setNumberOfTrades(numberOfTrades: number): void {
        this.numberOfTrades = numberOfTrades;
    }

    public getTakerBuyBaseAssetVolume(): number {
        return this.takerBuyBaseAssetVolume;
    }

    public setTakerBuyBaseAssetVolume(takerBuyBaseAssetVolume: number): void {
        this.takerBuyBaseAssetVolume = takerBuyBaseAssetVolume;
    }

    public getTakerBuyQuoteAssetVolume(): number {
        return this.takerBuyQuoteAssetVolume;
    }

    public setTakerBuyQuoteAssetVolume(takerBuyQuoteAssetVolume: number): void {
        this.takerBuyQuoteAssetVolume = takerBuyQuoteAssetVolume;
    }
}