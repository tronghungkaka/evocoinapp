import { Injectable } from "@angular/core";
import { Service } from "./service";
import { Dominance } from "../../../../objects/dominance";

import { Observable } from 'rxjs/Observable';


@Injectable()
export class DominanceService {

    constructor(
        private service: Service
    ) { }

    getDominances(exchange: string) : Observable<Dominance[]>{
        let pattern = "/api/evo/dominance";
        if (exchange != null) {
            pattern += "?exchange=" + exchange;
        }
        return this.service.get(pattern);
    }
}