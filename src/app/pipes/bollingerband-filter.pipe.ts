import { PipeTransform, Pipe } from '@angular/core';
import { BollingerBand } from '../objects/bollinger-band';

@Pipe({
    name: 'bollingerbandfilter'
})
export class BollingerBandFilterPipe implements PipeTransform {
    transform(value: BollingerBand[], filterBy: string) : BollingerBand[] {
        filterBy = filterBy && (filterBy.toLocaleLowerCase().indexOf('all') ===-1) ? filterBy.toLocaleLowerCase() : null;
        return filterBy && value ? value.filter(
            bb => bb.symbol.toLocaleLowerCase().indexOf(filterBy) !== -1
        ) : value;
    }
}