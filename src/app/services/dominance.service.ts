import { Injectable } from "@angular/core";
import { Service } from "./service";
import { Dominance } from "../objects/dominance";

import { Observable } from 'rxjs/Observable';

import * as AppUtils from '../utils/app.utils';


@Injectable()
export class DominanceService {

    constructor(
        private service: Service
    ) { }

    getDominances(exchange: string) : Observable<Dominance[]>{
        let pattern = AppUtils.BACKEND_API_EVO_DOMINANCE_PATH;
        if (exchange != null) {
            pattern += "?exchange=" + exchange;
        }
        return this.service.get(pattern);
    }
    
    getDominance(symbol: string, exchange: string) : Observable<Dominance[]>{
        let pattern = AppUtils.BACKEND_API_EVO_DOMINANCE_PATH;
        symbol = symbol.toUpperCase();
        pattern += "/" + symbol;
        if (exchange != null) {
            pattern += "?exchange=" + exchange;
        }
        return this.service.get(pattern);
    }
}