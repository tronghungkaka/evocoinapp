import { Component, OnInit } from "@angular/core";
import { DominanceService } from "../binance/api/client/services/dominance.service";
import { Dominance } from "../objects/dominance";

@Component({
    templateUrl: './dominance.component.html',
    styleUrls: ['./dominance.component.css']
})
export class DominanceComponent implements OnInit {
    title: "Dominance";

    exchange: string;

    searchSymbol: string;

    dominances: Dominance[];

    binanceTradeDetailURL: string = "https://www.binance.com/tradeDetail.html?symbol=";

    constructor(
        private dominanceService: DominanceService
    ) { }

    ngOnInit() {
        this.exchange = 'all';
        this.getDominances();
    }

    getDominances() {
        this.dominanceService.getDominances(this.exchange).subscribe(
            data => {
               this.dominances = data.sort( (a, b) => { return this.compareStrNumber(a._24hr_quote_volume, b._24hr_quote_volume) });
               console.log(JSON.stringify(this.dominances));
            }
        );
        // var dominance = new Dominance();
        // dominance.symbol = "KCSETH";
        // dominance.usdPrice = "0.02";
        // dominance.baseCurrencyPrice = "0.00000942";
        // dominance._24hr_quote_volume = "100.232";
        // dominance.excess = [
        //     {date: '05/4/2018', value: '-10'},
        //     {date: '06/4/2018', value: '-15'},
        //     {date: '07/4/2018', value: '15'},
        //     {date: '08/4/2018', value: '-15'},
        //     {date: '09/4/2018', value: '-15'},
        //     {date: '10/4/2018', value: '15'},
        //     {date: '11/4/2018', value: '-15'},
        //     {date: '12/4/2018', value: '15'},
        //     {date: '13/4/2018', value: '-15'},
        //     {date: '14/4/2018', value: '-15'},
        //     {date: '15/4/2018', value: '15'},
        //     {date: '16/4/2018', value: '-15'},
        //     {date: '17/4/2018', value: '15'},
        //     {date: '18/4/2018', value: '-15'},
        //     {date: '19/4/2018', value: '-15'}
        // ];
        // dominance.rsi = [65, 59, 80, 56, 55, 40, 45, 73, 80, 69, 22, 58, 42, 37, 64, 68, 53];

        // this.dominances = new Array();
        // this.dominances.push(dominance);
        // this.dominances.push(dominance);
        // this.dominances.push(dominance);
        // this.dominances.push(dominance);
    }

    changeExchange() {
      localStorage.setItem("bbExchange", this.exchange);
      this.getDominances();
    }
    
  collapse(element) {
    if(element.textContent == "Collapse")
      element.textContent = "Expand";
    else 
      element.textContent = "Collapse";
  }

  getCurrencySymbol(symbol: string) {
    if(symbol.endsWith("BTC") || symbol.endsWith("ETH") || symbol.endsWith("BNB")) {
      return symbol.substring(0, symbol.length - 3);
    }
    if(symbol.endsWith("USDT")) {
      return symbol.substring(0, symbol.length - 4);
    }
    return "";
  }

  getBaseCurrencySymbol(symbol: string) {
    if(symbol.endsWith("BTC")){
      return "BTC";
    }
    if(symbol.endsWith("ETH")){
      return "ETH";
    }
    if(symbol.endsWith("BNB")) {
      return "BNB";
    }
    if(symbol.endsWith("USDT")) {
      return "USDT";
    }
    return "";
  }

  compareStrNumber(a: string, b: string): number {
    let ia = a.indexOf(".");
    let ib = b.indexOf(".");
    if (ia > ib)
      return 1;
    if (ia < ib)
      return -1;
    let deca = a.substring(0, ia);
    let decb = b.substring(0, ib);
    if (deca > decb)
      return 1;
    if (deca < decb)
      return -1;
    let fraca = a.substring(ia);
    let fracb = b.substring(ib);
    if (fraca > fracb)
      return 1;
    if (fraca < fracb)
      return -1;
    return 0;
  }

  search() {
    if (this.searchSymbol == null || this.searchSymbol === '') {
      this.getDominances();
      return;
    }
    this.getDominance();
  }

  getDominance() {
    this.dominanceService.getDominance(this.searchSymbol, this.exchange).subscribe(
      data => {
         this.dominances = data.sort( (a, b) => { return this.compareStrNumber(a._24hr_quote_volume, b._24hr_quote_volume) });
         console.log(JSON.stringify(this.dominances));
      }
    );
  }
}