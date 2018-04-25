import { PipeTransform, Pipe } from '@angular/core';
import { Dominance } from '../objects/dominance';

@Pipe({
    name: 'dominancefilter'
})
export class DominanceFilterPipe implements PipeTransform {
    transform(value: Dominance[], filterBy: string) : Dominance[] {
        filterBy = filterBy && (filterBy.toLocaleLowerCase().indexOf('all') === -1) ? filterBy.toLocaleLowerCase() : null;
        return filterBy && value ? value.filter(
            bb => bb.symbol.toLocaleLowerCase().endsWith(filterBy)
        ) : value;
    }
}