export class Dominance {
    symbol: string;
    usdPrice: string;
    baseCurrencyPrice: string;
    _24hr_quote_volume: string;
    excess: Excess[];
    rsi: number[];
}

class Excess {
    date: string;
    value: string;
}