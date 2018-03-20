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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BollingerBandComponent,
    BinanceBollingerBandComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [Service, CandlestickService, TickerPriceService, ServerTimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
