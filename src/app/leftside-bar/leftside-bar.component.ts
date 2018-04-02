import { Component, OnInit } from '@angular/core';
import { CoinmarketcapTicker } from '../coinmarketcap/object/coinmarketcap-ticker.component';
import { CoinmarketcapService } from '../coinmarketcap/services/coinmarketcap-service';

@Component({
  selector: 'app-leftside-bar',
  templateUrl: './leftside-bar.component.html',
  styleUrls: ['./leftside-bar.component.css']
})
export class LeftsideBarComponent implements OnInit {
  title = 'Leftside Bar';

  cmc_tickers: CoinmarketcapTicker[];

  constructor(
    private coinmarketcapService: CoinmarketcapService
  ) { }

  ngOnInit() {
    this.coinmarketcapService.getTickers(null, 10, null).subscribe(
      data => this.cmc_tickers = data
    );
  }
}
