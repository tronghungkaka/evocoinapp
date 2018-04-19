import { PipeTransform, Pipe } from '@angular/core';
import { BollingerBand } from '../objects/bollinger-band';
import { StreamingBollingerBand } from '../objects/streaming-bollinge-band';

@Pipe({
    name: 'streamingbollingerbandfilter'
})
export class StreamingBollingerBandFilterPipe implements PipeTransform {
    transform(value: StreamingBollingerBand[], filterBy: string) : StreamingBollingerBand[] {
        filterBy = filterBy && (filterBy.toLocaleLowerCase().indexOf('all') ===-1) ? filterBy.toLocaleLowerCase() : null;
        return filterBy && value ? value.filter(
            sbb => sbb.s.toLocaleLowerCase().indexOf(filterBy) !== -1
        ) : value;
    }
}