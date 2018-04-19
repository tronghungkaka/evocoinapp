import { Component, OnInit, OnDestroy } from '@angular/core';
import { BollingerBandResponse } from '../objects/bollinger-band-response';
import { BollingerBandService } from '../binance/api/client/services/bollinger-band.service';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';
import { StreamingBollingerBand } from '../objects/streaming-bollinge-band';

@Component({
  selector: 'app-bollinger-band',
  templateUrl: './bollinger-band-stream.component.html',
  styleUrls: ['./bollinger-band-stream.component.css']
})
export class BollingerBandStreamComponent implements OnInit, OnDestroy {
  title = 'Bollinger Band Component';

  private serverUrl = 
                    // 'http://localhost:8080/socket';
                    'https://evocoinappserver.herokuapp.com/socket';
  private stompClient;
  lowerMap: Map<string, StreamingBollingerBand>;
  upperMap: Map<string, StreamingBollingerBand>;
  
  lowersbb: StreamingBollingerBand[];
  uppersbb: StreamingBollingerBand[];

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

    this.lowerMap = new Map();
    this.upperMap = new Map();

    this.timeFrame = localStorage.getItem("bbTimeFrame") || "30m";
    this.exchange = localStorage.getItem("bbExchange") || "all";
    this.market = localStorage.getItem("bbMarket") || "all";

    localStorage.setItem("bbTimeFrame", this.timeFrame);
    localStorage.setItem("bbExchange", this.exchange);
    localStorage.setItem("bbMarket", this.market);

    // this.getEvoBollingerBands();
    this.initializeWebSocketConnection();
  }

  ngOnDestroy() {
    this.closeWebSocketConnection();
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

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    // this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/bollingerband/" + that.timeFrame, (message) => {
        // console.log(JSON.stringify(message))
        if(message.body) {
          let sbb: StreamingBollingerBand = JSON.parse(message.body);
          if(sbb.U.includes("true")) {
            that.upperMap.set(sbb.s, sbb);
            // console.log(that.upperMap.size);
          }
          else if(sbb.L.includes("true")) {
            that.lowerMap.set(sbb.s, sbb);
            // console.log(that.lowerMap.size);
          }
          else {
            that.upperMap.delete(sbb.s);
            that.lowerMap.delete(sbb.s);
          }

          that.lowersbb = Array.from(that.lowerMap.values()).sort( (a, b) => { return (+a.p > +b.p) ? 0 : 1 });
          that.uppersbb = Array.from(that.upperMap.values()).sort( (a, b) => { return (+a.p > +b.p) ? 0 : 1 });
        }
      });
    });
  }

  closeWebSocketConnection() {
      this.stompClient.disconnect(function() {
          console.log("websockets disconnect");
      });
  }

  changeTimeFrame() {
    localStorage.setItem("bbTimeFrame", this.timeFrame);
    this.closeWebSocketConnection();
    // this.getEvoBollingerBands();
    this.initializeWebSocketConnection();
  }

  changeExchange() {
    localStorage.setItem("bbExchange", this.exchange);
    this.closeWebSocketConnection();
    // this.getEvoBollingerBands();
    this.initializeWebSocketConnection();
  }

  changeMarket() {
    localStorage.setItem("bbMarket", this.market);
    // this.closeWebSocketConnection();
    // this.getEvoBollingerBands();
    // this.initializeWebSocketConnection();
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


}
