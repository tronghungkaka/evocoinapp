import { Component, OnInit, OnDestroy } from '@angular/core';
import { BollingerBandResponse } from '../objects/bollinger-band-response';
import { BollingerBandService } from '../services/bollinger-band.service';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';
import { StreamingBollingerBand } from '../objects/streaming-bollinge-band';

import * as AppUtils from '../utils/app.utils';

@Component({
  selector: 'app-bollinger-band',
  templateUrl: './bollinger-band-stream.component.html',
  styleUrls: ['./bollinger-band-stream.component.css']
})
export class BollingerBandStreamComponent implements OnInit, OnDestroy {
  title = 'Bollinger Band Component';

  private serverUrl = 
                    // AppUtils.BACKEND_API_ROOT_LOCAL_URL + AppUtils.BACKEND_SOCKET_PATH;
                    AppUtils.BACKEND_API_ROOT_URL + AppUtils.BACKEND_SOCKET_PATH;
                    
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

  binanceTradeDetailURL: string = AppUtils.BINANCE_TRADE_DETAIL_URL;

  STORAGE_BB_TIMEFRAME: string = 'bbTimeFrame';
  STORAGE_BB_EXCHANGE: string = 'bbExchange';
  STORAGE_BB_MARKET: string = 'bbMarket';

  constructor(
    private bollingerbandService: BollingerBandService
  ) {}

  ngOnInit() {
    console.log("Bollinger band component");

    this.init();

    this.timeFrame = localStorage.getItem(this.STORAGE_BB_TIMEFRAME) || "30m";
    this.exchange = localStorage.getItem(this.STORAGE_BB_EXCHANGE) || "all";
    this.market = localStorage.getItem(this.STORAGE_BB_MARKET) || "all";

    localStorage.setItem(this.STORAGE_BB_TIMEFRAME, this.timeFrame);
    localStorage.setItem(this.STORAGE_BB_EXCHANGE, this.exchange);
    localStorage.setItem(this.STORAGE_BB_MARKET, this.market);

    // this.getEvoBollingerBands();
    this.initializeWebSocketConnection();
  }

  init() {
    this.lowerMap = new Map();
    this.upperMap = new Map();
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
    this.init();
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/bollingerband/" + that.timeFrame, (message) => {
        // console.log(JSON.stringify(message))
        if(message.body) {
          let sbb: StreamingBollingerBand = JSON.parse(message.body);
          if(sbb.U.includes("true")) {
            that.upperMap.set(sbb.s, sbb);
            // console.log('upperMap.size=' + that.upperMap.size);
            
            console.clear();
            console.log("sbb=" + JSON.stringify(sbb));
          }
          else if(sbb.L.includes("true")) {
            that.lowerMap.set(sbb.s, sbb);
            // console.log('lowerMap.size='+ that.lowerMap.size);

            console.clear();
            console.log("sbb=" + JSON.stringify(sbb));
          }
          else {
            that.upperMap.delete(sbb.s);
            that.lowerMap.delete(sbb.s);
          }

          that.lowersbb = Array.from(that.lowerMap.values()).sort( (a, b) => { return -that.compareStrNumber(a.p, b.p) });
          that.uppersbb = Array.from(that.upperMap.values()).sort( (a, b) => { return -that.compareStrNumber(a.p, b.p) });

          // console.log("uppersbb.length=" + that.uppersbb.length);
          // console.log("lowersbb.length=" + that.lowersbb.length);
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
    localStorage.setItem(this.STORAGE_BB_TIMEFRAME, this.timeFrame);
    this.closeWebSocketConnection();
    // this.getEvoBollingerBands();
    this.initializeWebSocketConnection();
  }

  changeExchange() {
    localStorage.setItem(this.STORAGE_BB_EXCHANGE, this.exchange);
    this.closeWebSocketConnection();
    // this.getEvoBollingerBands();
    this.initializeWebSocketConnection();
  }

  changeMarket() {
    localStorage.setItem(this.STORAGE_BB_MARKET, this.market);
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

  compareStrNumber(a: string, b: string): number {
    if(a === null || b === null)
      return 0;

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
}
