import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/timeout';

import * as AppUtils from '../utils/app.utils';

const httpOptions = {
    headers: new HttpHeaders({
        'timeout': '180000'
    })
};

@Injectable()
export class Service {
    private url = 
                    // AppUtils.BACKEND_API_ROOT_LOCAL_URL; 
                    AppUtils.BACKEND_API_ROOT_URL;

    constructor(
        private http: HttpClient
    ) { }

    get<T>(pattern: string): Observable<T> {
        return this.http.get<T>(this.url + pattern, httpOptions)
            .pipe(
                //tap(T => console.log(JSON.stringify(T)))
            );
    }

    getJson<T>(pattern: string): Observable<T> {
        return this.http.get<T>(pattern, httpOptions)
            .pipe(
                //tap(T => console.log(JSON.stringify(T)))
            );
    }
}