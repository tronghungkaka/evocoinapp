import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Service } from './services/service';
import { CandlestickService } from './services/candlestick.service';
import { TickerPriceService } from './services/ticker-price.service';
import { ServerTimeService } from './services/server-time.service';
import { HomeComponent } from './home/home.component';
import { BollingerBandComponent } from './bollinger-band/bollinger-band.component';

import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoinmarketcapService } from './coinmarketcap/services/coinmarketcap-service';
import { BollingerBandService } from './services/bollinger-band.service';
import { BollingerBandFilterPipe } from './pipes/bollingerband-filter.pipe';
import { AlertComponent } from './registration-login/_directives';
import { DasboardComponent } from './registration-login/dasboard';
import { LoginComponent } from './registration-login/login';
import { RegisterComponent } from './registration-login/register';
import { AuthGuard } from './registration-login/_guards';
import { AlertService, AuthenticationService, UserService } from './registration-login/_services';
import { JwtInterceptor, fakeBackendProvider } from './registration-login/_helpers';
import { AdminAuthGuard } from './registration-login/_guards/admin-auth.guard';
import { UpdateComponent } from './registration-login/update';
import { BollingerBandStreamComponent } from './bollinger-band-stream/bollinger-band-stream.component';
import { StreamingBollingerBandFilterPipe } from './pipes/streamingbollingerband-filter.pipe';
import { DominanceComponent } from './dominance/dominance.component';
import { DominanceFilterPipe } from './pipes/dominance-filter.pipe';
import { RSIChartComponent } from './charts/rsi-chart/rsi-chart.component';
import { DominanceService } from './services/dominance.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PackageComponent } from './payment-package/package/package.component';
import { PackageDetailComponent } from './payment-package/package-detail/package-detail.component';
import { PaymentComponent } from './payment-package/payment/payment.component';
import { FreeAuthGuard } from './registration-login/_guards/free-auth.guard';
import { GoldAuthGuard } from './registration-login/_guards/gold-auth.guard';
import { DiamondAuthGuard } from './registration-login/_guards/diamond-auth.guard';
import { SupervipAuthGuard } from './registration-login/_guards/supervip-auth.guard';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { UpgradeModalComponent } from './modal/upgrade/upgrade-modal.component';
import { RightsideBarComponent } from './rightside-bar/rightside-bar.component';
import { GuideComponent } from './payment-package/guide/guide.component';
import { PaymentPackageDasboardComponent } from './payment-package/payment-package-dasboard/payment-package-dasboard.component';
import { PaymentDetailComponent } from './payment-package/payment-detail/payment-detail.component';
import { RootAuthGuard } from './registration-login/_guards/root-auth.guard';
import { NoneAuthGuard } from './registration-login/_guards/none-auth.guard';
import { PaymentService } from './payment-package/_services/payment.service';
import { Utilities } from './utils/app.utils';
import { AccountFilterPipe } from './pipes/account-filter.pipe';
import { PaymentSuccessComponent } from './payment-package/payment-success/payment-success.component';
import { PaymentAuthGuard } from './registration-login/_guards/payment-auth.guard';
import { ConfirmModalComponent } from './modal/confirm/confirm-modal.component';
import { PaymentConfirmModalComponent } from './modal/payment-confirm/payment-confirm-modal.component';
import { DetailComponent } from './registration-login/detail/detail.component';
import { EmailService } from './payment-package/_services/email.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BollingerBandComponent,
    BollingerBandStreamComponent,

    HeaderComponent,
    RightsideBarComponent,
    FooterComponent,

    BollingerBandFilterPipe,
    StreamingBollingerBandFilterPipe,
    DominanceFilterPipe,
    AccountFilterPipe,

    DominanceComponent,
    RSIChartComponent,

    AlertComponent,
    DasboardComponent,
    LoginComponent,
    RegisterComponent,
    UpdateComponent,
    DetailComponent,
    
    PackageComponent,
    PackageDetailComponent,
    PaymentComponent,
    GuideComponent,
    PaymentPackageDasboardComponent,
    PaymentDetailComponent,
    PaymentSuccessComponent,

    UpgradeModalComponent,
    ConfirmModalComponent,
    PaymentConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    Service, 
    CandlestickService, 
    TickerPriceService, 
    ServerTimeService,
    BollingerBandService,
    CoinmarketcapService,

    DominanceService,

    AuthGuard,
    NoneAuthGuard,
    FreeAuthGuard,
    GoldAuthGuard,
    DiamondAuthGuard,
    SupervipAuthGuard,
    AdminAuthGuard,
    RootAuthGuard,

    PaymentAuthGuard,

    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    PaymentService,
    EmailService

    // provider used to create back end
    // fakeBackendProvider
  ],
  entryComponents: [
    UpgradeModalComponent,
    ConfirmModalComponent,
    PaymentConfirmModalComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
