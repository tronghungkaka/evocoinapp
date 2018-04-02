import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BollingerBandComponent } from './bollinger-band/bollinger-band.component';
import { BinanceBollingerBandComponent } from './binance/bollinger-band/binance-bollinger-band.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'bollingerband', component: BollingerBandComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true })],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}