import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

// const httpOptions = {
//     headers: new HttpHeaders({ 
//         'Access-Control-Allow-Origin': 'https://api.binance.com',
//         'Access-Control-Allow-Credentials': 'true',
//         'Access-Control-Expose-Headers': 'FooBar'
//     })
// };

@Injectable()
export class Service {
    private url = '';//'https://api.binance.com';

    constructor(
        private http: HttpClient
    ) { }

    get<T>(pattern: string): Observable<T> {
        return this.http.get<T>(this.url + pattern)
            .pipe(
                //tap(T => console.log(JSON.stringify(T)))
            );
    }
}