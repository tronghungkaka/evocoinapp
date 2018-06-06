import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoinmarketcapTicker } from '../coinmarketcap/object/coinmarketcap-ticker.component';
import { CoinmarketcapService } from '../coinmarketcap/services/coinmarketcap-service';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';

import * as AppUtils from '../utils/app.utils';

@Component({
  selector: 'app-rightside-bar',
  templateUrl: './rightside-bar.component.html',
  styleUrls: ['./rightside-bar.component.css']
})
export class RightsideBarComponent implements OnInit, OnDestroy {
  title = 'Leftside Bar';

  cmc_tickers: CoinmarketcapTicker[];

  private serverUrl = 
                    // AppUtils.BACKEND_API_ROOT_LOCAL_URL + AppUtils.BACKEND_SOCKET_PATH;
                    AppUtils.BACKEND_API_ROOT_URL + AppUtils.BACKEND_SOCKET_PATH;
                    
  private stompClient;

  constructor(
    private coinmarketcapService: CoinmarketcapService
  ) { }

  ngOnInit() {
    this.coinmarketcapService.getTickers(null, 10, null).subscribe(
      data => this.cmc_tickers = data
    );
  }

  ngOnDestroy() {

  }

  // initializeWebSocketConnection() {
  //   let ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   // this.stompClient.debug = null;
  //   let that = this;
  //   this.stompClient.connect( {}, function(frame) {
  //     that.stompClient.subscribe("/coinmarketcap/top10", (message) => {
  //       if (message.body) {

  //       }
  //     })
  //   });
  // }
}
