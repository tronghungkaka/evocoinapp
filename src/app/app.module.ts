import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Service } from './binance/api/client/services/service';
import { CandlestickService } from './binance/api/client/services/candlestick.service';
import { TickerPriceService } from './binance/api/client/services/ticker-price.service';
import { ServerTimeService } from './binance/api/client/services/server-time.service';
import { HomeComponent } from './home/home.component';
import { BinanceBollingerBandComponent } from './binance/bollinger-band/binance-bollinger-band.component';
import { BollingerBandComponent } from './bollinger-band/bollinger-band.component';

import { FormsModule } from '@angular/forms';
import { LeftsideBarComponent } from './leftside-bar/leftside-bar.component';
import { CoinmarketcapService } from './coinmarketcap/services/coinmarketcap-service';
import { BollingerBandService } from './binance/api/client/services/bollinger-band.service';
import { BollingerBandFilterPipe } from './pipes/bollingerband-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BollingerBandComponent,
    BinanceBollingerBandComponent,
    LeftsideBarComponent,

    BollingerBandFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    Service, 
    CandlestickService, 
    TickerPriceService, 
    ServerTimeService,
    BollingerBandService,
    CoinmarketcapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
