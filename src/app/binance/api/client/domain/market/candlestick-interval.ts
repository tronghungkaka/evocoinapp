/**
 * m -> minutes; h -> hours; d - days; w -> weeks; M -> months
 */
export class CandlestickInterval {
    static ONE_MINUTE = '1m';
    static THREE_MINUTES = '3m';
    static FIVE_MINUTES = '5m';
    static FIFTEEN_MINUTES = '15m';
    static HALF_HOURLY = '30m';
    static HOURLY = '1h';
    static TWO_HOURLY = '2h';
    static FOUR_HOURLY = '4h';
    static SIX_HOURLY = '6h';
    static EIGHT_HOURLY = '8h';
    static TWELVE_HOURLY = '12h';
    static DAILY = '1d';
    static THREE_DAILY = '3d';
    static WEEKLY = '1w';
    static MONTHLY = '1M';

    static getInterval(interval: number): string {
        let value: string = '';
        switch(interval) {
        case CandlestickIntervalMilis.ONE_MINUTE:
            value = this.ONE_MINUTE;
            break;

        case CandlestickIntervalMilis.THREE_MINUTES:
            value = this.THREE_MINUTES;
            break;

        case CandlestickIntervalMilis.FIVE_MINUTES:
            value = this.FIVE_MINUTES;
            break;

        case CandlestickIntervalMilis.FIFTEEN_MINUTES:
            value = this.FIFTEEN_MINUTES;
            break;

        case CandlestickIntervalMilis.HALF_HOURLY:
            value = this.HALF_HOURLY;
            break;

        case CandlestickIntervalMilis.HOURLY:
            value = this.HOURLY;
            break;

        case CandlestickIntervalMilis.TWO_HOURLY:
            value = this.TWO_HOURLY;
            break;

        case CandlestickIntervalMilis.FOUR_HOURLY:
            value = this.FOUR_HOURLY;
            break;

        case CandlestickIntervalMilis.SIX_HOURLY:
            value = this.SIX_HOURLY;
            break;

        case CandlestickIntervalMilis.EIGHT_HOURLY:
            value = this.EIGHT_HOURLY;
            break;

        case CandlestickIntervalMilis.TWELVE_HOURLY:
            value = this.TWELVE_HOURLY;
            break;

        case CandlestickIntervalMilis.DAILY:
            value = this.DAILY;
            break;

        case CandlestickIntervalMilis.THREE_DAILY:
            value = this.THREE_DAILY;
            break;

        case CandlestickIntervalMilis.WEEKLY:
            value = this.WEEKLY;
            break;

        case CandlestickIntervalMilis.MONTHLY:
            value = this.MONTHLY;
            break;
        }

        return value;
    }
}

enum CandlestickIntervalMilis {
    ONE_MINUTE = 60,
    THREE_MINUTES = 180,
    FIVE_MINUTES = 300,
    FIFTEEN_MINUTES = 900,
    HALF_HOURLY = 1800,
    HOURLY = 3600,
    TWO_HOURLY = 7200,
    FOUR_HOURLY = 14400,
    SIX_HOURLY = 21600,
    EIGHT_HOURLY = 28800,
    TWELVE_HOURLY = 43200,
    DAILY = 86400,
    THREE_DAILY = 259200,
    WEEKLY = 604800,
    MONTHLY = 2592000
}