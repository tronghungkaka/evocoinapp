export class TickerPrice {
    symbol: string;
    price: number;

    constructor(tickerPriceInner: TickerPriceInner) {
        this.symbol = tickerPriceInner.symbol;
        this.price = tickerPriceInner.price;
    }

    getSymbol(): string {
        return this.symbol;
    }

    setSymbol(symbol: string): void {
        this.symbol = symbol;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = price;
    }
}

export class TickerPriceInner {
    symbol: string;
    price: number;

    constructor() { }

    getSymbol(): string {
        return this.symbol;
    }

    setSymbol(symbol: string): void {
        this.symbol = symbol;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = price;
    }
}

export class TickerPriceOuter {
    symbol: string;
    price: number;

    constructor(tickerPrice: TickerPrice) {
        this.symbol = tickerPrice.symbol;
        this.price = tickerPrice.price;
    }

    getSymbol(): string {
        return this.symbol;
    }

    setSymbol(symbol: string): void {
        this.symbol = symbol;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = price;
    }
}