import { Component, OnInit } from '@angular/core';
import { BollingerBandResponse } from '../objects/bollinger-band-response';
import { BollingerBandService } from '../binance/api/client/services/bollinger-band.service';

@Component({
  selector: 'app-bollinger-band',
  templateUrl: './bollinger-band.component.html',
  styleUrls: ['./bollinger-band.component.css']
})
export class BollingerBandComponent implements OnInit {
  title = 'Bollinger Band Component';

  timeFrame: string;
  exchange: string;
  market: string;

  lastUpdated: number;

  bollingerbandResponse: BollingerBandResponse;

  binanceTradeDetailURL: string = "https://www.binance.com/tradeDetail.html?symbol=";

  constructor(
    private bollingerbandService: BollingerBandService
  ) {}

  ngOnInit() {
    console.log("Bollinger band component");

    this.timeFrame = localStorage.getItem("bbTimeFrame") || "30m";
    this.exchange = localStorage.getItem("bbExchange") || "all";
    this.market = localStorage.getItem("bbMarket") || "all";

    localStorage.setItem("bbTimeFrame", this.timeFrame);
    localStorage.setItem("bbExchange", this.exchange);
    localStorage.setItem("bbMarket", this.market);

    this.getEvoBollingerBands();
  }

  getEvoBollingerBands() {
    this.bollingerbandService.getEvoBollingerBandResponse(this.exchange, this.timeFrame).subscribe(
      data => {
        this.bollingerbandResponse = data;
        this.lastUpdated = this.bollingerbandResponse.LastUpdated;
        console.log(JSON.stringify(data))
      }
    );
  }

  changeTimeFrame() {
    localStorage.setItem("bbTimeFrame", this.timeFrame);
    this.getEvoBollingerBands();
  }

  changeExchange() {
    localStorage.setItem("bbExchange", this.exchange);
    this.getEvoBollingerBands();
  }

  changeMarket() {
    localStorage.setItem("bbMarket", this.market);
  }

  collapse(element) {
    if(element.textContent == "Collapse")
      element.textContent = "Expand";
    else 
      element.textContent = "Collapse";
  }
}
