import { BollingerBand } from './bollinger-band';

export class BollingerBandResponse {
    OutOfUpperBB: BollingerBand[];
    OutOfLowerBB: BollingerBand[];
    LastUpdated: number;

    constructor() {
        this.OutOfLowerBB = new Array();
        this.OutOfUpperBB = new Array();
    }
}