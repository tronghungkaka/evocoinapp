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

  constructor(
    private bollingerbandService: BollingerBandService
  ) {}

  ngOnInit() {
    console.log("Bollinger band component");

    this.timeFrame = "30m";
    this.exchange = "all";
    this.market = "all";

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
    this.getEvoBollingerBands();
  }

  changeExchange() {
    this.getEvoBollingerBands();
  }

  changeMarket() {

  }
}
