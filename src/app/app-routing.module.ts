import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BollingerBandComponent } from './bollinger-band/bollinger-band.component';
import { BinanceBollingerBandComponent } from './binance/bollinger-band/binance-bollinger-band.component';
import { LoginComponent } from './registration-login/login';
import { RegisterComponent } from './registration-login/register';
import { AuthGuard } from './registration-login/_guards';
import { DasboardComponent } from './registration-login/dasboard';
import { AdminAuthGuard } from './registration-login/_guards/admin-auth.guard';
import { UpdateComponent } from './registration-login/update';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'bollingerband', component: BollingerBandComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'update', component: UpdateComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [AdminAuthGuard]},
    { path: 'dasboard', component: DasboardComponent, canActivate: [AdminAuthGuard]},

    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true })],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}